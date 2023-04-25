import React, { useState } from "react"
import AddPlayer from "../AddPlayer"
import TableContainer from "../../Resource/Components/Table/TableContainer"
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
            isFetching={isFetching}
            rowPerPage={8}
        />
    )
}
