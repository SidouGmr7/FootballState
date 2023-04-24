import React from "react"
import { TextField, SelectField, NumberField } from "../../Components/Fields/FormikFields"
import { positionData } from "../../data/RowData"
import { labelStyle } from "./tailwind"
import { Button } from "@material-ui/core"
import { usePlayers } from "../../hooks/usePlayers"

export const AddPlayerForm = (props) => {
    const { country } = usePlayers()
    const { values } = props.formik

    const teamSection = Array.from({ length: values["team_count"] }, (_, index) => (
        <div className='flex mb-6' key={index}>
            <SelectField
                name='teamname'
                value={values.team[index]?.name}
                choices={country}
                field={`team[${index}].name`}
            />
            <NumberField
                name='match'
                value={values.team[index]?.match}
                field={`team[${index}].match`}
            />
            <NumberField
                name='goals'
                value={values.team[index]?.goals}
                field={`team[${index}].goals`}
            />
        </div>
    ))
    return (
        <form onSubmit={props.formik.handleSubmit} className='max-w-md mx-4 my-4'>
            <label className={labelStyle}>data status</label>
            <div className='flex mb-6'>
                <TextField name='name' field='name' />
                <SelectField
                    name='position'
                    field='position'
                    value={values.position}
                    choices={positionData}
                />
            </div>
            <label className={labelStyle}>Country</label>
            <div className='flex mb-6'>
                <SelectField
                    name='countryname'
                    choices={country}
                    value={values.country.name}
                    field={`country.name`}
                />
                <NumberField name='match' field={`country.match`} value={values.country.match} />
                <NumberField name='goals' field={`country.goals`} value={values.country.goals} />
            </div>
            <div className='flex mb-6'>
                <SelectField
                    name='team count'
                    choices={[1, 2, 3, 4, 5, 6, 7]}
                    field='team_count'
                    value={values.team_count}
                />
            </div>
            {teamSection}
            <Button variant='contained' color='primary' type='submit'>
                {props.onEdit ? "Update" : "Add"} Player
            </Button>
        </form>
    )
}
