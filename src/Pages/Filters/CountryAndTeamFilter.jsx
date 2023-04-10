import React from "react"
import { SelectField } from "../../Components/Fields/Fields"
import { Grid } from "@material-ui/core"
import { usePlayers } from "../../hooks/usePlayers"
import { useLocation } from "react-router-dom"

export const CountryAndTeamFilter = (props) => {
    const { country } = usePlayers()
    const { setDataAfterFilter, setTeam, dataFilterOnIt } = props
    const path = useLocation().pathname
    const isNationalData = path === "/app/national"
    const isTeamData = path === "/app/team"

    const onSelectTeam = (e) => {
        setTeam(e.target.value)
        if (country.includes(e.target.value)) {
            setDataAfterFilter(
                dataFilterOnIt.filter((p) => {
                    if (isNationalData) return p.national.name === e.target.value
                    if (isTeamData) return p.team.map((t) => t.name === e.target.value)
                    return null
                })
            )
        } else {
            setDataAfterFilter(null)
        }
    }
    return (
        <Grid item>
            <SelectField choices={country} name='Select Country' onChange={(e) => onSelectTeam(e)}>
                <option className='text-rose-200'>Chose the {isTeamData ? "Team" : "Country"}</option>
            </SelectField>
        </Grid>
    )
}
