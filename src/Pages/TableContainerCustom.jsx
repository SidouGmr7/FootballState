import React, { useState, useEffect } from "react"
import { db } from "../firebase.config"
import { collection, getDocs, query } from "firebase/firestore"
import { useLocation } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import AddPlayer from "../Pages/AddPlayer"
import { serverTimestamp } from "firebase/firestore"
import { onSubmit } from "../Pages/AddPlayer"
import TableContainer from "../Components/Table/TableContainer"
import { LoadingPage } from "../Components/LoadingPage"
import _ from "lodash"

const tableData = require("../script/table_international_goals.json")
export const TableContainerCustom = (props) => {
    const [Team, setTeam] = useState(null)
    const Path = useLocation().pathname
    const [data, setData] = useState([])
    const [dataFilter, setDataFilter] = useState([])
    const selectData = [...new Set(data.map((d) => d.national.name))]
    const onMutate = async () => {
        try {
            const docSnap = await getDocs(query(collection(db, "Player")))
            const data = docSnap.docs.map((doc) => doc.data())
            setData(data)
        } catch (error) {
            setData(tableData)
            setDataFilter(tableData)
        }
    }

    useEffect(() => {
        onMutate()
    }, [])

    const onSelectTeam = (e) => {
        setTeam(e.target.value)
        if (selectData.includes(e.target.value)) {
            setDataFilter(
                data.filter((p) => {
                    if (isNationalData) return p?.national.name === e.target.value
                    if (isTeamData) return p.team.map((t) => t.name === e.target.value)
                    return null
                })
            )
        } else {
            setDataFilter(data)
        }
    }
    const isNationalData = Path === "/national"
    const isTeamData = Path === "/team"
    if (_.isEmpty(data)) return <LoadingPage />
    return (
        <TableContainer
            {...props}
            updateDataFromTemplate={async (onEdit) => {
                tableData.map(async (data) => {
                    const uuid = uuidv4()
                    const newData = {
                        ...data,
                        lastUpdate: serverTimestamp(),
                        uuid: uuid,
                        position: "Forward",
                        team_count: 1,
                        team: [],
                    }
                    onSubmit(newData, onEdit)
                })
            }}
            ActionPopover={{
                components: AddPlayer,
                buttonName: "Add Player",
            }}
            filters={[onSelectTeam]}
            data={dataFilter}
            setData={setDataFilter}
            team={Team}
            selectData={[...new Set(data.map((d) => d.national.name))]}
        />
    )
}
