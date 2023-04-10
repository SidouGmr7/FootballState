import React from "react"
import {
    Grid,
    makeStyles,
    Typography,
    Paper,
    Icon,
    IconButton,
    useMediaQuery,
    Divider,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    zoneCard: {
        padding: 16,
        display: "flex",
        border: "1px solid #d8dadf",
        borderRadius: 10,
        width: "100%",
        margin: 8,
        alignItems: "center",
        [theme.breakpoints.down("md")]: { textAlign: "center" },
        "&:hover": {
            boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
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
    ContentSkeleton: { width: "100%" },
    deleteIcon: {
        cursor: "pointer",
    },
}))

export const ListeContainer = (props) => {
    const classes = useStyles()
    const isMd = useMediaQuery("(max-width: 810px)", { noSsr: true })

    return props.data.map((data) => (
        <Grid container sm={12} md={12}>
            <Paper elevation={2} variant='elevation' className={classes.zoneCard}>
                <Grid container={!isMd} className={classes.zoneContent}>
                    <Grid sm={12} md={1}>
                        <Typography variant='body1'>{data?.recordTitle}</Typography>
                    </Grid>
                    <Divider />
                    <Divider orientation='vertical' flexItem />
                    <Grid sm={12} md={4}>
                        <Typography variant='body1' className={classes.zoneName}>
                            player
                        </Typography>
                        <Typography variant='body1'>
                            {data?.player}
                        </Typography>
                    </Grid>
                    <Divider />
                    <Divider orientation='vertical' flexItem />
                    <Grid sm={12} md={4}>
                        <Typography variant='body1' className={classes.zoneName}>
                        record
                        </Typography>
                        <Typography variant='body1'>{data?.record}</Typography>
                    </Grid>
                </Grid>
                {/* <Grid className={classes.deleteIcon}>
                    <IconButton onClick={() => handleDeleteWarinigZone(data)}>
                        <Icon>delete</Icon>
                    </IconButton>
                </Grid> */}
            </Paper>
        </Grid>
    ))
}
