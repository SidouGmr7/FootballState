import axios from "axios"
import fs from "fs"
import { load } from "cheerio"
import { templates } from "./templates"
export function generateTemplate(dataToJson, fileName, url) {
    axios
        .get(url)
        .then((response) => {
            console.log(`${url}  ...wait`)
            const $ = load(response.data)
            const html = $.html()
            fs.writeFileSync(`src/script/html/${fileName}.html`, html)
            console.log(`${url}  ...success`)
            const PlayerData = dataToJson(html)
            fs.writeFileSync(`src/script/json/${fileName}.json`, JSON.stringify(PlayerData))
            // savePlayerDataToFile(PlayerData);
        })
        .catch((error) => {
            console.error(error)
        })
}
templates.map(({ dataToJson, fileName, url }) => generateTemplate(dataToJson, fileName, url))
