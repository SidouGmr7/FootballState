import React from "react"
import Table from "./DataTable"
import { useLocation } from "react-router-dom"
import { SelectField } from "../Fields/Fields"
import { Button, Grid, Typography } from "@material-ui/core"
import { withPopoverMui } from "../Dialog/PopoverContainer"

const TableContainer = (props) => {
    const { filters } = props
    const path = useLocation().pathname

    const ActionPopover = withPopoverMui(props?.ActionPopover.components, ({ onClick }) => {
        return (
            <Button variant='contained' color='primary' onClick={onClick}>
                {props?.ActionPopover.buttonName}
            </Button>
        )
    })
    return (
        <div className='min-h-screen'>
            <div className='m-8'>
                <Grid container className='mb-8'>
                    <Grid item>
                        <Typography
                            className='mt-8'
                            variant='caption'
                            style={{ fontSize: 20 }}
                            gutterBottom={true}>
                            Nationale Team Statistic
                        </Typography>
                    </Grid>
                    <Grid container spacing={3} justifyContent='flex-end'>
                        {filters.map((filter, index) => {
                            return (
                                <Grid item key={index}>
                                    <SelectField
                                        choices={props.selectData}
                                        name='Select Country'
                                        onChange={(e) => filter(e)}>
                                        <option className='text-rose-200'>
                                            Chose the {path === "/team" ? "Team" : "Country"}
                                        </option>
                                    </SelectField>
                                </Grid>
                            )
                        })}

                        {props.updateDataFromTemplate &&
                            ["Add", "Upadate"].map((button) => {
                                return (
                                    <Grid item>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={() =>
                                                props.updateDataFromTemplate(button === "upadate" ? false : true)
                                            }>
                                            {button} Template
                                        </Button>
                                    </Grid>
                                )
                            })}
                        {props?.ActionPopover.components && (
                            <Grid item>
                                <ActionPopover />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Table {...props} />
            </div>
        </div>
    )
}

export default TableContainer
