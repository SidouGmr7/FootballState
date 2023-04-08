import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import AddPlayer from "../Pages/AddPlayer"
import { serverTimestamp } from "firebase/firestore"
import { onSubmit } from "../Pages/AddPlayer"
import TableContainer from "../Components/Table/TableContainer"
import { usePlayers } from "../hooks/usePlayers"
import { CountryAndTeamFilter } from "./Components/CountryAndTeamFilter"

export const TableContainerCustom = (props) => {
    const { players, inProgress, country, fetchData, setInProgress } = usePlayers()
    const [playersAfterFilter, setPlayersAfterFilter] = useState(null)
    const [team, setTeam] = useState(null)
    return (
        <TableContainer
            {...props}
            updateDataFromTemplate={async (onEdit) => {
                setInProgress(true)
                players.map(async (data) => {
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
                fetchData()
            }}
            ActionPopover={{
                components: AddPlayer,
                buttonName: "Add Player",
            }}
            filters={[
                <CountryAndTeamFilter setDataAfterFilter={setPlayersAfterFilter} setTeam={setTeam} dataFilterOnIt={players} />,
            ]}
            data={playersAfterFilter || players}
            setData={setPlayersAfterFilter}
            team={team}
            selectData={country}
            fetchData={fetchData}
            inProgress={inProgress}
            rowPerPage={8}
        />
    )
}
