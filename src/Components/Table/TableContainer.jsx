import React from "react"
import Table from "./DataTable"
import { useLocation } from "react-router-dom"
import { SelectField } from "../Fields/Fields"
import { Button, Grid, Typography } from "@material-ui/core"
import { withPopoverMui } from "../Dialog/PopoverContainer"

const TableContainer = (props) => {
    const { Team, filters } = props
    const path = useLocation().pathname

    const ActionPopover = withPopoverMui(props?.ActionPopover.components, ({ onClick }) => {
        return (
            <Button variant='contained' color='primary' onClick={onClick}>
                {props?.ActionPopover.buttonName}
            </Button>
        )
    })
    return (
        <div>
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
                        {filters.map((filter) => {
                            return (
                                <Grid item>
                                    <SelectField
                                        choices={props.selectData}
                                        name='Select Country'
                                        onChange={(e) => filter(e)}
                                        extraValue={
                                            <option className='text-rose-200'>
                                                Chose the {path === "/team" ? "Team" : "Country"}
                                            </option>
                                        }
                                    />
                                </Grid>
                            )
                        })}

                        {props.updateDataFromTemplate && (
                            <>
                                <Grid item>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => props.updateDataFromTemplate(false)}>
                                        Add template
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => props.updateDataFromTemplate(true)}>
                                        upadate template
                                    </Button>
                                </Grid>
                            </>
                        )}
                        {props?.ActionPopover.components && (
                            <Grid item>
                                <ActionPopover />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Table data={props.data} {...props} team={Team} />
            </div>
        </div>
    )
}

export default TableContainer
