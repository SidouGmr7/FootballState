
import axios from "axios"
import { urlPath } from "../config/config"

export const fetchRecordPlayer = async () => {
    return await axios.get(`${urlPath}record_player`).then(res => res.data)
}