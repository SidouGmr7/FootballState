import React from "react"
import Slider from "@material-ui/core/Slider"
import { withStyles } from "@material-ui/core/styles"

const PrettoSlider = withStyles({
    root: {
        color: "#19B2C5",
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -8,
        marginLeft: -12,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)",
        "& span": {
            fontSize: "11px",
            textAlign: "center",
        },
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider)

export const SliderComponent = (props) => {
    return (
        <PrettoSlider
            valueLabelDisplay='auto'
            aria-label='pretto slider'
            max={1000}
            name='radius'
            onChange={(event, value) => {
                props.setFieldValue(props.field, value)
            }}
        />
    )
}
