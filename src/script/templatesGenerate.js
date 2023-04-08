import { parserHtmlToJSON, correctionCssSelector } from "./helpers/functionHelpers.js"

export function generate_international_golas(html) {
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
            { national: { ...Country[index + 1], ...Goals[index], ...Match[index] } }
        )
        return merged
    })
}



export function generate_champions_league_goals(html) {
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
            { UCL: { ...Country[index + 1], ...Goals[index], ...Match[index] } }
        )
        return merged
    })
}