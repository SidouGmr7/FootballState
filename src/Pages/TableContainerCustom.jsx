import React, { useState, useEffect } from "react"
import { db } from "../firebase.config"
import { collection, getDocs, query } from "firebase/firestore"
import { useLocation } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import AddPlayer from "../Pages/AddPlayer"
import { serverTimestamp } from "firebase/firestore"
import { onSubmit } from "../Pages/AddPlayer"
import TableContainer from "../Components/Table/TableContainer"
const tableData = require("../script/table_international_goals.json")

export const TableContainerCustom = (props) => {
    const [Team, setTeam] = useState(null)
    const Path = useLocation().pathname
    const [data, setData] = useState(tableData)
    const [dataFilter, setDataFilter] = useState(data)
    const onMutate = async () => {
        const docSnap = await getDocs(query(collection(db, "Player")))
        const data = docSnap.docs.map((doc) => doc.data())
        setData(data)
    }

    useEffect(() => {
        return () => {
            onMutate()
        }
    }, [])

    const onSelectTeam = (e) => {
        setTeam(e.target.value)
        if (props.selectData.includes(e.target.value)) {
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
            Team={Team}
            setTeam={setTeam}
        />
    )
}
