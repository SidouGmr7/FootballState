import moment from "moment"
import { teamData } from "./RowData"

export const countryColumn = [
    {
        name: "Name",
        value: (row) => {
            return row.name
        },
    },
    {
        name: "Country",
        value: (row) => {
            return row.country.name
        },
    },
    {
        name: "Goals",
        value: (row) => {
            return row.country.goals
        },
    },
    {
        name: "Match",
        value: (row) => {
            return row.country.match
        },
    },
    {
        name: "Ratio",
        value: (row) => {
            return (row.country.goals / row.country.match).toFixed(2)
        },
    },
    // {
    //     name: "LastUpdate",
    //     value: (row) => {
    //         return row.lastUpdate ? moment(row.lastUpdate.toDate().toString()).format("DD/MM/YY") : null
    //     },
    // },
]

export const equipeColumn = [
    {
        name: "Name",
        value: (row) => {
            return row.name
        },
    },
    {
        name: "Team",
        value: (row, team) => {
            return teamData.includes(team)
                ? row.team?.find((t) => t.name === team).name
                : row.team?.map((t) => t.name) + "" || null
        },
    },
    {
        name: "Goals",
        value: (row, team) => {
            return teamData.includes(team)
                ? row.team?.find((t) => t.name === team).goals
                : row.team?.reduce((acc, val) => acc + parseInt(val.goals), 0)
        },
    },
    {
        name: "Match",
        value: (row, team) => {
            return teamData.includes(team)
                ? row.team?.find((t) => t.name === team).match
                : row.team?.reduce((acc, val) => acc + parseInt(val.match), 0)
        },
    },
    {
        name: "Ratio",
        value: (row, team) => {
            return teamData.includes(team)
                ? (
                      row.team?.find((t) => t.name === team).goals /
                      row.team?.find((t) => t.name === team).match
                  ).toFixed(2)
                : (
                      row.team?.reduce((acc, val) => acc + parseInt(val.goals), 0) /
                      row.team?.reduce((acc, val) => acc + parseInt(val.match), 0)
                  ).toFixed(2)
        },
    },
    {
        name: "LastUpdate",
        value: (row) => {
            return moment(row?.lastUpdate?.toDate().toString()).format("DD/MM/YY") || null
        },
    },
]

export const uclColumn = [
    {
        name: "Name",
        value: (row) => {
            return row.name
        },
    },
    {
        name: "country",
        value: (row) => {
            return row.country ? row.country.name : 'NaN'
        },
    },
    {
        name: "Goals",
        value: (row) => {
            return row.UCL.goals
        },
    },
    {
        name: "Match",
        value: (row) => {
            return row.UCL.match
        },
    },
    {
        name: "Assist",
        value: (row) => {
            return row.UCL.assists
        },
    },
    {
        name: "Ratio",
        value: (row) => {
            return (row.UCL.goals / row.UCL.match).toFixed(2)
        },
    },
    // {
    //     name: "LastUpdate",
    //     value: (row) => {
    //         return row.lastUpdate ? moment(row.lastUpdate.toDate().toString()).format("DD/MM/YY") : null
    //     },
    // },
]
