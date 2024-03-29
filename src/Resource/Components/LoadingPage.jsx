import React from "react"
import ReactLoading from "react-loading"
import { Grid, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    loadingAreaContainer: {
        paddingBottom: "6rem",
        paddingTop: "12rem",
        paddingRight: "12rem",
        paddingLeft: "12rem",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: "8rem",
        },
    },
    loadingTextContainer: {
        textAlign: "center",
    },
}))

export const LoadingPage = (props) => {
    const classes = useStyles()
    // const theme = useTheme()
    return (
        <Grid container spacing={2} alignItems='center' className={classes.loadingAreaContainer}>
            <Grid container item xs={12} justifyContent='center'>
                <ReactLoading
                    type={props.type || "bars"}
                    color='primary'
                    height={60}
                    width={60}
                />
            </Grid>
            <Grid item xs={12} className={classes.loadingTextContainer}>
                <Typography>{props.loadingText || "veuillez patienter..."}</Typography>
            </Grid>
        </Grid>
    )
}
