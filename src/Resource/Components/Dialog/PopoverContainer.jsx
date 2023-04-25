import React, { useState } from "react"
import { Popover as PopoverMui, makeStyles, Backdrop, useMediaQuery, useTheme } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    popoverRoot: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    cancel: {
        position: "absolute",
        top: "20px",
        left: "20px",
        zIndex: 1000,
        fontSize: "32px",
        borderRadius: "100%",
        color: "#cdea69",
        cursor: "pointer",
        backgroundColor: "#FFFFFF70",
    },
}))

export const Popover = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles()
    const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"))
    const { renderButton: ActionButton } = props
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const style = isMobile ? props?.mobileStyle : props?.popoverStyle || {}
    return (
        <>
            <ActionButton onClick={handleClick} />
            <PopoverMui
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorReference='none'
                transitionDuration={0}
                classes={{ root: classes.popoverRoot }}
                PaperProps={{ style: style }}>
                <Backdrop open={Boolean(anchorEl)} onClick={handleClose} />
                {props.children({ handleClose })}
            </PopoverMui>
        </>
    )
}

export function withPopoverMui(Component, Button) {
    return function (props) {
        return (
            <Popover
                popoverStyle={props.popoverStyle || {}}
                renderButton={({ onClick }) => {
                    return <Button onClick={onClick} />
                }}>
                {({ handleClose }) => {
                    return <Component {...props} handleClose={handleClose} />
                }}
            </Popover>
        )
    }
}
