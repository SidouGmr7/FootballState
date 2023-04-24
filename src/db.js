const playersData = require("./script/json/playersData.json")
const uclGoals = require("./script/json/champions_league_goals.json")
const countryGoals = require("./script/json/country_golas.json")
const record_player = require("./data/recordPlayer.json")

module.exports = () => {
    const data = {
        record_player: record_player,
        ucl: uclGoals,
        country: countryGoals,
        playersData:playersData
    }
    return data
}
