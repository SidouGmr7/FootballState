import { INTERNATIONAL_GOALS_TEMPLATE, CHAMPIONS_LEAGUE_GOALS_TEMPLATE } from "./config/config.js"
import { generate_international_golas, generate_champions_league_goals } from "./templatesGenerate.js"

export const templates = [
    {
        dataToJson: generate_international_golas,
        fileName: "international_golas",
        url: INTERNATIONAL_GOALS_TEMPLATE,
    },
    {
        dataToJson: generate_champions_league_goals,
        fileName: "champions_league_goals",
        url: CHAMPIONS_LEAGUE_GOALS_TEMPLATE,
    },
]