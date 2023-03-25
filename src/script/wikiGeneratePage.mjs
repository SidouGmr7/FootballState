import axios from "axios"
import fs from "fs"
import { load } from "cheerio"

function parserToJSON(html, selector, field, useparseInt = false) {
    const $ = load(html)
    const Object = []
    $(selector).each((index, element) => {
        if (useparseInt ? parseInt($(element).text()) : true) {
            Object.push({
                [field]: useparseInt ? parseInt($(element).text()) : $(element).text(),
            })
        }
    })
    return Object
}
function correctionCssSelector(replaces) {
    let initialnot = ""
    let initialreplace = ""
    const not = replaces.reduce((acc, val) => acc + `:not(tr:nth-child(${val}) td:nth-child(5))`, initialnot)
    const replace = replaces.reduce(
        (acc, val) => acc + `,tr:nth-child(${val}) > td:nth-child(6)`,
        initialreplace
    )
    const base = "tr td:nth-child(5)"
    return `${base}${not}${replace}`
}

function generatePlayerData(html) {
    const playerName = parserToJSON(html, "span.fn a", "name")
    const Country = parserToJSON(html, "span:nth-child(1) > a:nth-child(2)", "name")
    const Goals = parserToJSON(
        html,
        "td:nth-child(5) > a:nth-child(1), td:nth-child(4) > a:nth-child(1),tr:nth-child(13) > td:nth-child(5)",
        "goals",
        true
    )
    const Match = parserToJSON(
        html,
        correctionCssSelector([
            2, 3, 4, 5, 6, 8, 9, 10, 12, 14, 18, 19, 23, 26, 31, 32, 33, 34, 37, 39, 41, 43, 48, 51, 57, 58,
            60, 66, 71,
        ]),
        "match",
        true
    )
    return playerName.map(function (item, index) {
        const merged = Object.assign(
            item,
            { wikiTemplate: true },
            { national: { ...Country[index + 1], ...Goals[index], ...Match[index] } }
        )
        return merged
    })
}
const url = "https://en.wikipedia.org/wiki/List_of_men%27s_footballers_with_50_or_more_international_goals"
axios
    .get(url)
    .then((response) => {
        console.log(`${url}  ...wait`)
        const $ = load(response.data)
        const html = $.html()
        fs.writeFileSync("src/script/table_international_goals.html", html)
        console.log(`${url}  ...success`)
        const PlayerData = generatePlayerData(html)
        fs.writeFileSync("src/script/table_international_goals.json", JSON.stringify(PlayerData))
        console.log("PlayerData", PlayerData)
        return PlayerData
    })
    .catch((error) => {
        console.error(error)
    })
