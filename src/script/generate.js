import axios from "axios"
import fs from "fs"
import { load } from "cheerio"
import { templates } from "./templates"
export async function generateTemplate(dataToJson, fileName, url) {
   await axios
        .get(url)
        .then((response) => {
            console.log(`${fileName}  ...wait`)
            const $ = load(response.data)
            const html = $.html()
            // fs.writeFileSync(`src/script/html/${fileName}.html`, html)
            console.log(`${fileName}  ...success`)
            const PlayerData = dataToJson(html)
            fs.writeFileSync(`src/script/json/${fileName}.json`, JSON.stringify(PlayerData))
        })
        .catch((error) => {
            console.error(error.cause.errno)
        })
}
templates.map(({ dataToJson, fileName, url }) => generateTemplate(dataToJson, fileName, url))
