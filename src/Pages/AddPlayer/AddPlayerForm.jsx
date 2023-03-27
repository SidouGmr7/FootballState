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
            <label class={labelStyle}>Country</label>
            <div className='flex mb-6'>
                <SelectField
                    name='nationalname'
                    choices={country}
                    value={values.national.name}
                    field={`national.name`}
                />
                <NumberField name='match' field={`national.match`} value={values.national.match} />
                <NumberField name='goals' field={`national.goals`} value={values.national.goals} />
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
