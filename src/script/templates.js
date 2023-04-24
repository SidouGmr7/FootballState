import { COUNTRY_GOALS_TEMPLATE, CHAMPIONS_LEAGUE_GOALS_TEMPLATE, FAKE_URL } from "./config/config.js"
import { generate_country_golas, generate_champions_league_goals } from "./templatesGenerate.js"

export const templates = [
    {
        dataToJson: generate_country_golas,
        fileName: "country_golas",
        url: COUNTRY_GOALS_TEMPLATE,
    },
    {
        dataToJson: generate_champions_league_goals,
        fileName: "champions_league_goals",
        url: CHAMPIONS_LEAGUE_GOALS_TEMPLATE,
    },
    // {
    //     dataToJson: generate_data_of_all_playares,
    //     fileName: "playersData",
    //     url: FAKE_URL,
    // },

]