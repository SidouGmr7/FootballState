import React, { useState } from "react"
import Table from "../Components/DataTable"
import { db } from "../firebase.config"
import { collection, getDocs, query } from "firebase/firestore"
import { EquipeCol } from "../data/ColumnsData"
import { TeamData, CountryData } from "../data/RowData"
import { useLocation } from "react-router-dom"
import { SelectField } from "./AddPlayer/Fields"

const National = () => {
  const [Players, setPlayers] = useState([])
  const [Team, setTeam] = useState("France")
  const path = useLocation().pathname
  const choices = path === "/team" ? TeamData : CountryData

  const onMutate = async (e) => {
    setTeam(e.target.value)
    const docSnap = await getDocs(query(collection(db, "Player")))
    const players = docSnap.docs.map((doc) => doc.data())
    setPlayers(players)
  }
  return (
    <div>
      <div className='h-screen bg-slate-200 flex flex-row'>
        <Table Players={Players} Col={EquipeCol} Type='ucl' Team={Team} />
        <div className='w-[50%] p-4 '>
          <select
            onChange={onMutate}
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full focus:ring-green-500 focus:border-green-500 px-10 py-3'>
            <option className='text-rose-200'>
              Chose the {path === "/team" ? "Team" : "Country"}
            </option>
            {choices.map((Team, index) => (
              <option key={index} value={Team}>
                {Team}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default National
