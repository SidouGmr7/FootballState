import { useEffect, useState } from "react"
import axios from "axios"
import { urlPath } from "../config/config"
import { useLocation } from "react-router-dom"
import { useQuery } from "react-query"

export function usePlayers() {
    const [country, setCountry] = useState([])
    const path = useLocation().pathname.split("/")
    const location = path[path.length - 1]

    const { data, isFetching, refetch } = useQuery(["players", [location]], () => {
        return axios.get(`${urlPath}${location}`).then((res) => res.data)
    })
    
    useEffect(() => {
        const countries = data?.map((d) => d?.country?.name)
        setCountry([...new Set(countries)])
    }, [data])

    return { data, isFetching, country, refetch }
}
