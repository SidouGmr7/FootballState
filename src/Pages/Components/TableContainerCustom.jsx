import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import AddPlayer from "../AddPlayer"
import { serverTimestamp } from "firebase/firestore"
import { onSubmit } from "../AddPlayer"
import TableContainer from "../../Components/Table/TableContainer"
import { usePlayers } from "../../hooks/usePlayers"
import { CountryAndTeamFilter } from "../Filters/CountryAndTeamFilter"

export const TableContainerCustom = (props) => {
    const { data, isFetching, refetch, country } = usePlayers()
    const [playersAfterFilter, setPlayersAfterFilter] = useState(null)
    const [team, setTeam] = useState(null)
    return (
        <TableContainer
            {...props}
            updateDataFromTemplate={null}
            ActionPopover={{
                components: AddPlayer,
                buttonName: "Add",
            }}
            filters={[
                <CountryAndTeamFilter
                    setDataAfterFilter={setPlayersAfterFilter}
                    setTeam={setTeam}
                    dataFilterOnIt={data}
                />,
            ]}
            data={playersAfterFilter || data}
            setData={setPlayersAfterFilter}
            team={team}
            selectData={country}
            // fetchData={fetchData}
            isFetching={isFetching}
            rowPerPage={8}
        />
    )
}
