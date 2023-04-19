import { useEffect, useState } from "react"
import axios from "axios"
import { urlPath } from "../config/config"

export function usePlayers() {
    const [inProgress, setInProgress] = useState(false)
    const [players, setPlayers] = useState([])
    const [country, setCountry] = useState([])

    const fetchData = async () => {
        setInProgress(true)
        try {
            const res = await axios.get(`${urlPath}ucl`)
            setPlayers(res.data)
            setCountry([...new Set(players.map((d) => d.national.name))])
        } catch (error) {
            console.error(error)
        } finally {
            setInProgress(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { players, setPlayers, inProgress, setInProgress, country, fetchData }
}
