import { useEffect, useState } from "react"
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../firebase.config.js"
import _ from "lodash"

let tableData = []
try {
    tableData = require("../script/table_international_goals.json")
} catch (error) {}

export function usePlayers() {
    const [inProgress, setInProgress] = useState(false)
    const [players, setPlayers] = useState([])
    const [country, setCountry] = useState([])
    const [status, setStatus] = useState({ label: "Firebase", firebase: true })

    const fetchData = async () => {
        setInProgress(true)
        try {
            const docSnap = await getDocs(query(collection(db, "Player")))
            const players = docSnap.docs.map((doc) => doc.data())
            if (!_.isEmpty(players)) {
                setPlayers(players)
                setCountry([...new Set(players.map((d) => d.national.name))])
                setStatus({ label: "Firebase", firebase: true })
            } else {
                setPlayers(tableData)
                setCountry([...new Set(tableData?.map((d) => d.national.name))])
                setStatus({ label: "Json", firebase: false })
            }
            // setDataFilter(tableData)
        } catch (error) {
            setPlayers(tableData)
            setCountry([...new Set(tableData.map((d) => d.national.name))])
            setStatus({ label: "Json", firebase: false })
            console.error(error)
        } finally {
            setInProgress(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { players, inProgress, setInProgress, setPlayers, country, fetchData, status }
}
