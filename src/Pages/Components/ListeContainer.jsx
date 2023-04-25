import React from "react"
import { Grid, makeStyles, Typography, Paper, useMediaQuery, Divider } from "@material-ui/core"
import { useQuery } from "react-query"
import { fetchRecordPlayer } from "../../data/dataAction"

const useStyles = makeStyles((theme) => ({
    zoneCard: {
        padding: 24,
        display: "flex",
        border: "1px solid rgb(34 197 94)",
        borderRadius: 20,
        width: "100%",
        margin: "20px 50px 0px 50px",
        alignItems: "center",
        [theme.breakpoints.down("md")]: { textAlign: "center" },
        "&:hover": {
            boxShadow: `0 0 0 1px rgb(34 197 94)`,
            borderColor: "rgb(34 197 94)",

            backgroundColor: "#F5F5F5",
        },
    },
    zoneName: {
        lineHeight: "25px",
        fontWeight: "inherit",
        color: "#696969",
        marginBottom: "8px",
    },
    zoneContent: { [theme.breakpoints.down("sm")]: { width: "90%" }, justifyContent: "space-around" },
    deleteIcon: {
        cursor: "pointer",
    },
}))

export const ListeContainer = () => {
    const classes = useStyles()
    const isMd = useMediaQuery("(max-width: 810px)")
    const { data, isFetching } = useQuery("players", fetchRecordPlayer)

    return (
        !isFetching &&
        data.map((record) => (
            <Grid container sm={12} md={12}>
                <Paper elevation={2} variant='elevation' className={classes.zoneCard}>
                    <Grid container={!isMd} className={classes.zoneContent}>
                        <Grid sm={12} md={1}>
                            <Typography variant='body1'>{record?.recordTitle}</Typography>
                        </Grid>
                        <Divider />
                        <Divider orientation='vertical' flexItem />
                        <Grid sm={12} md={4}>
                            <Typography variant='body1' className={classes.zoneName}>
                                player
                            </Typography>
                            <Typography variant='body1'>{record?.player}</Typography>
                        </Grid>
                        <Divider />
                        <Divider orientation='vertical' flexItem />
                        <Grid sm={12} md={4}>
                            <Typography variant='body1' className={classes.zoneName}>
                                record
                            </Typography>
                            <Typography variant='body1'>{record?.record}</Typography>
                        </Grid>
                    </Grid>
                    {/* <Grid className={classes.deleteIcon}>
                    <IconButton onClick={() => handleDeleteWarinigZone(record)}>
                        <Icon>delete</Icon>
                    </IconButton>
                </Grid> */}
                </Paper>
            </Grid>
        ))
    )
}
