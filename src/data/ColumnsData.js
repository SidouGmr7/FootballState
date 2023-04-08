import moment from "moment"
import { teamData } from "./RowData"

export const nationalColumn = [
    {
        name: "Name",
        value: (row) => {
            return row.name
        },
    },
    {
        name: "National",
        value: (row) => {
            return row.national.name
        },
    },
    {
        name: "Goals",
        value: (row) => {
            return row.national.goals
        },
    },
    {
        name: "Match",
        value: (row) => {
            return row.national.match
        },
    },
    {
        name: "Ratio",
        value: (row) => {
            return (row.national.goals / row.national.match).toFixed(2)
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
