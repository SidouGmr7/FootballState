import React from "react"
import Table from "./DataTable"
import { Button, Grid, Typography } from "@material-ui/core"
import { withPopoverMui } from "../Dialog/PopoverContainer"
import { LoadingPage } from "../LoadingPage"

const TableContainer = (props) => {
    const { filters } = props
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
                    <Grid container spacing={3} justifyContent='flex-end'>
                        {filters.map((filter, index) => {
                            const FilterComponent = filter.type
                            return <FilterComponent key={index} {...filter.props} />
                        })}

                        {props.updateDataFromTemplate &&
                            ["Upadate"].map((button, index) => {
                                return (
                                    <Grid item key={index}>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={() =>
                                                props.updateDataFromTemplate(button === "Add" ? false : true)
                                            }>
                                            {button} Temp
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
                {props.inProgress ? <LoadingPage /> : <Table {...props} />}
            </div>
        </div>
    )
}

export default TableContainer
