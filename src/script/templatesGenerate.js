import { parserHtmlToJSON, correctionCssSelector } from "./helpers/functionHelpers.js"
// let CountryGoals = require("./json/country_golas.json")
// let uclGloals = require("./json/champions_league_goals.json")

export function generate_country_golas(html) {
    const playerName = parserHtmlToJSON(html, "span.fn a", "name")
    const Country = parserHtmlToJSON(html, "span:nth-child(1) > a:nth-child(2)", "name")
    const Goals = parserHtmlToJSON(
        html,
        "td:nth-child(5) > a:nth-child(1), td:nth-child(4) > a:nth-child(1),tr:nth-child(13) > td:nth-child(5)",
        "goals",
        true
    ).filter((goal) => !isNaN(goal.goals))
    const Match = parserHtmlToJSON(
        html,
        correctionCssSelector([
            2, 3, 4, 5, 6, 8, 9, 10, 12, 18, 19, 23, 26, 31, 32, 33, 34, 37, 39, 41, 43, 48, 51, 58, 60, 66,
            71,
        ]),
        "match",
        true
    )
    return playerName.map(function (item, index) {
        const merged = Object.assign(
            item,
            { wikiTemplate: true },
            { country: { ...Country[index + 1], ...Goals[index], ...Match[index] } },
            { id: index + 1 }
        )
        return merged
    })
}

export function generate_champions_league_goals(html) {
    const playerName = parserHtmlToJSON(html, "td:nth-child(1)", "name")
    const position = parserHtmlToJSON(html, "td:nth-child(2)", "position")
    const Match = parserHtmlToJSON(html, "td:nth-child(3)", "match", true)
    const Goals = parserHtmlToJSON(html, "td:nth-child(4)", "goals", true)
    const Assists = parserHtmlToJSON(html, "td:nth-child(5)", "assists", true)
    return playerName.map(function (item, index) {
        const merged = Object.assign(
            { id: index + 1 },
            { name: item.name[0] === " " ? item.name.substring(1) : item.name },
            { ...position[index] },
            { UCL: { ...Match[index], ...Goals[index], ...Assists[index] } }
        )
        return merged
    })
}

// export function generate_data_of_all_playares(html) {
//     const mergedJson = uclGloals
//         .map((item1) => {
//             const item2 = CountryGoals.find((item2) => item1.name === item2.name)
//             if (item2) {
//                 return { ...item1, ...item2 }
//             }
//             return item1
//         })
//         .concat(CountryGoals.filter((item2) => !uclGloals.some((item1) => item1.name === item2.name)))
//     return mergedJson
// }
