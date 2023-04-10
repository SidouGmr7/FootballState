import React from "react"
import { Paper, List, ListItem } from "@material-ui/core"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { Link } from "react-router-dom"
import { sliderLink } from "../../routes"

export const Slider = () => {
    return (
        <Paper
            elevation={3}
            style={{ boxShadow: "4px 3px 20px #c7c7c7" }}
            className=' md:w-1/4 '>
            <List>
                {sliderLink.map(({ title, link, icon }, index) => (
                    <Link to={link} key={index}>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Paper>
    )
}
