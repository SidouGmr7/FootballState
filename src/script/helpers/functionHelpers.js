import { load } from "cheerio"

export function parserHtmlToJSON(html, selector, field, useparseInt = false) {
    const $ = load(html)
    const Object = []
    $(selector).each((index, element) => {
        Object.push({
            [field]: useparseInt ? parseInt($(element).text()) : $(element).text(),
        })
    })
    return Object
}

export function correctionCssSelector(replaces) {
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

export function savePlayerDataToFile(PlayerData) {
    const data = JSON.stringify(PlayerData, null, 2) // the second argument, null, is a replacer function to filter out properties, and the third argument, 2, specifies the number of spaces to use as white space for pretty-printing
    const file = new Blob([data], { type: "application/json" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(file)
    a.download = "table_international_goals.json"
    document.body.appendChild(a)
    a.click()
}
