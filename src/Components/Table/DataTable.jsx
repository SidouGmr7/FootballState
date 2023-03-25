import React, { useState } from "react"
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    IconButton,
    Icon,
} from "@material-ui/core"
import { withPopoverMui } from "../Dialog/PopoverContainer"
import AddPlayer from "../../Pages/AddPlayer"

export default function DataTable(props) {
    const [state, setState] = useState({
        transactionPage: 0,
        transactionPerPage: 8,
    })
    const { transactionPage, transactionPerPage } = state
    const startIndex = transactionPage * transactionPerPage
    const endIndex = startIndex + transactionPerPage
    const data = props.data.slice(startIndex, endIndex)
    const handlerPageChanged = (event, newPage) => {
        setState((prevState) => ({ ...prevState, transactionPage: newPage }))
    }

    const handlerPerPageChanged = (event) => {
        const newPerPage = event.target.value
        setState((prevState) => ({
            ...prevState,
            transactionPage: 0,
            transactionPerPage: newPerPage,
        }))
    }
    const labelDisplayedRows = ({ from, to, count }) => {
        return `${from}-${to} of ${count !== -1 ? count : "more than {page}"}`
    }

    const EditPlayerPopover = withPopoverMui(AddPlayer, ({ onClick }) => {
        return (
            <IconButton onClick={onClick}>
                <Icon>+</Icon>
            </IconButton>
        )
    })
    console.log('props.team',props.team);
    return (
        <Paper elevation={3} style={{ boxShadow: "4px 3px 20px #c7c7c7" }}>
            <Table aria-labelledby='tableTitle'>
                <TableHead>
                    <TableRow>
                        <TableCell>C</TableCell>
                        {props.column.map((cul) => (
                            <TableCell>{cul.name}</TableCell>
                        ))}
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((Player, index) => {
                        return (
                            <TableRow key={index} hover={true} tabIndex={-1}>
                                <TableCell>{index + 1 + startIndex}</TableCell>
                                {props.column.map((cul) => (
                                    <TableCell>{cul.value(Player, props.team)}</TableCell>
                                ))}
                                <TableCell>{<EditPlayerPopover player={Player} onEdit={true} />}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <TablePagination
                component='div'
                count={props.data.length}
                rowsPerPage={transactionPerPage}
                labelDisplayedRows={labelDisplayedRows}
                labelRowsPerPage='Rows per page:'
                page={transactionPage}
                backIconButtonProps={{ "aria-label": "Previous Page" }}
                nextIconButtonProps={{ "aria-label": "Next Page" }}
                rowsPerPageOptions={[5, 10, 20, 25]}
                onChangePage={handlerPageChanged}
                onChangeRowsPerPage={handlerPerPageChanged}
            />
        </Paper>
    )
}
