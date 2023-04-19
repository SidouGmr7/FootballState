import axios from "axios"
import { urlPath } from "../config/config"

export const fetchRecordPlayer = async () => {
    let response
    try {
        response = await axios.get(`${urlPath}record_player`)
    } catch (error) {
        console.error(error)
    }
    return response
}
