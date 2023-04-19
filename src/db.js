const tableData = require("./script/json/champions_league_goals.json")
const record_player = require("./data/recordPlayer.json")

module.exports = () => {
    const data = {
        record_player: record_player,
        UCL: tableData
    }
    return data
}
