import React, { useState, useEffect } from "react"
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
    TableContainer,
} from "@material-ui/core"
import { withPopoverMui } from "../Dialog/PopoverContainer"
import AddPlayer from "../../Pages/AddPlayer"

export default function DataTable(props) {
    const [state, setState] = useState({
        transactionPage: 0,
        transactionPerPage: props.rowPerPage || 5,
        sortColumn: null,
        sortDirection: "",
    })
    const { transactionPage, transactionPerPage } = state
    const startIndex = transactionPage * transactionPerPage
    const endIndex = startIndex + transactionPerPage
    const data = props?.data?.slice(startIndex, endIndex)

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            transactionPage: 0,
            transactionPerPage: props.rowPerPage || 5,
        }))
    }, [])

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

    const EditPopover = withPopoverMui(AddPlayer, ({ onClick, index }) => {
        return (
            <IconButton key={index} onClick={onClick}>
                <Icon>+</Icon>
            </IconButton>
        )
    })

    const handleSort = (cul) => {
        const { sortColumn, sortDirection } = state
        let newSortDirection = "▲"
        if (sortColumn === cul.name) {
            newSortDirection = sortDirection === "▲" ? "▼" : "▲"
        }
        const sortedData = [...props.data].sort((a, b) => {
            if (cul.value(a) < cul.value(b)) {
                return newSortDirection === "▲" ? 1 : -1
            }
            if (cul.value(a) > cul.value(b)) {
                return newSortDirection === "▲" ? -1 : 1
            }
            return 0
        })
        props.setData(sortedData)
        setState((prevState) => ({
            ...prevState,
            sortColumn: cul.name,
            sortDirection: newSortDirection,
        }))
    }
    return (
        <Paper elevation={3} style={{ boxShadow: "4px 3px 20px #c7c7c7" }}>
            <TableContainer>
                <Table aria-labelledby='tableTitle'>
                    <TableHead>
                        <TableRow>
                            <TableCell>C</TableCell>
                            {props.column.map((cul, index) => (
                                <TableCell key={index} onClick={() => handleSort(cul)}>
                                    {cul.name} {state.sortDirection}
                                    {state.sortColumn === cul.value &&
                                        setState((prevState) => ({
                                            ...prevState,
                                            sortDirection: "▲" ? "▼" : "▲",
                                        }))}
                                </TableCell>
                            ))}
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row, index) => {
                            return (
                                <TableRow key={index} hover={true} tabIndex={-1}>
                                    <TableCell>{index + 1 + startIndex}</TableCell>
                                    {props.column.map((cul, index) => (
                                        <TableCell key={index}>{cul.value(row, props.team)}</TableCell>
                                    ))}
                                    <TableCell>
                                        {<EditPopover data={row} onEdit={true} />}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component='div'
                count={props?.data?.length || 1}
                rowsPerPage={transactionPerPage}
                labelDisplayedRows={labelDisplayedRows}
                labelRowsPerPage='Rows per page:'
                page={transactionPage}
                backIconButtonProps={{ "aria-label": "Previous Page" }}
                nextIconButtonProps={{ "aria-label": "Next Page" }}
                rowsPerPageOptions={[props.rowPerPage, 5, 10, 20, 25]}
                onPageChange={handlerPageChanged}
                onRowsPerPageChange={handlerPerPageChanged}
            />
        </Paper>
    )
}
