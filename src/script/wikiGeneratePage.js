import axios from "axios"
import fs from "fs"
import { load } from "cheerio"
import { parserHtmlToJSON, correctionCssSelector } from "./functionHelpers.js"
import { INTERNATIONAL_GOALS_TEMPLATE } from "./config.js"

function generatePlayerData(html) {
    const playerName = parserHtmlToJSON(html, "span.fn a", "name")
    const Country = parserHtmlToJSON(html, "span:nth-child(1) > a:nth-child(2)", "name")
    const Goals = parserHtmlToJSON(
        html,
        "td:nth-child(5) > a:nth-child(1), td:nth-child(4) > a:nth-child(1),tr:nth-child(13) > td:nth-child(5)",
        "goals",
        true
    )
    const Match = parserHtmlToJSON(
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


export function generateTemplate(url){
    axios
    .get(url)
    .then((response) => {
        console.log(`${url}  ...wait`)
        const $ = load(response.data)
        const html = $.html()
        // fs.writeFileSync("src/script/table_international_goals.html", html)
        console.log(`${url}  ...success`)
        const PlayerData = generatePlayerData(html)
        fs.writeFileSync("src/script/table_international_goals.json", JSON.stringify(PlayerData))
        // savePlayerDataToFile(PlayerData);
    })
    .catch((error) => {
        console.error(error)
    })
}

generateTemplate(INTERNATIONAL_GOALS_TEMPLATE)