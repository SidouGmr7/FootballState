import { TableContainerCustom as TableContainer } from "./Pages/Components/TableContainerCustom"
import { nationalColumn, equipeColumn, uclColumn } from "./data/ColumnsData"
import { teamData } from "./data/RowData"
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material"
import AddPlayer from "./Pages/AddPlayer"
import Home from "./Pages/Home"
import  PlayerRecordGeneral  from "./data/PlayerRecordGeneral.json"
import { ListeContainer } from './Pages/Components/ListeContainer';


export const sliderLink = [
    {
        title: "National",
        components: <TableContainer column={nationalColumn} />,
        link: "/app/national",
        icon: <ThreeDRotation />,
    },
    {
        title: "UCL",
        components: <TableContainer column={uclColumn} />,
        link: "/app/ucl",
        icon: <AccessAlarm />,
    },
    {
        title: "Team",
        components: <TableContainer column={equipeColumn} selectData={teamData} />,
        link: "/app/team",
        icon: <AccessAlarm />,
    },
    {
        title: "RecordGeneral",
        components: <ListeContainer data={PlayerRecordGeneral} />,
        link: "/app/record_general",
        icon: <AccessAlarm />,
    },
]

export const routes = [
    {
        title: "Home",
        components: <Home />,
        link: "/",
    },
    {
        title: "Add",
        components: <AddPlayer />,
        link: "/add",
    },
]
