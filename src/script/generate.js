import axios from "axios"
import fs from "fs"
import { load } from "cheerio"
import { INTERNATIONAL_GOALS_TEMPLATE, CHAMPIONS_LEAGUE_GOALS_TEMPLATE } from "./config/config.js"
import { generate_international_golas } from "./templatesGenerate.js"

const template = {
    internationalGolas: {
        dataToJson: generate_international_golas,
        fileName: "international_golas",
        url: INTERNATIONAL_GOALS_TEMPLATE,
    },

    championsLeagueGoals: {
        dataToJson: generate_international_golas,
        fileName: "champions_league_goals",
        url: CHAMPIONS_LEAGUE_GOALS_TEMPLATE,
    },
}


const { dataToJson, fileName, url } = template.championsLeagueGoals

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

generateTemplate(dataToJson, fileName, url)