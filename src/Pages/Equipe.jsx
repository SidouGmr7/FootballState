import React, { useState } from 'react'
import Table from '../Components/DataTable'
import { db } from '../firebase.config'
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore'
import { EquipeCol } from '../data/ColumnsData'
import { PlayerData, TeamData, CountryData } from '../data/RowData'
import { useLocation } from 'react-router-dom'

const Equipe = () => {
  const [Players, setPlayers] = useState([])
  const [Team, setTeam] = useState('bayern')
  const Path = useLocation().pathname

  const onSubmit = async () => {
    await setDoc(doc(db, 'Equipe', PlayerData.id), PlayerData)
    alert('Player' + PlayerData.name + 'Added')
  }

  const onMutate = async (e) => {
    setTeam(e.target.value)
    const docRef = query(collection(db, 'Equipe'))
    const docSnap = await getDocs(docRef)
    const players = docSnap.docs.map((doc) => doc.data())
    setPlayers(players)
  }
  return (
    <div>
      <div className='h-screen bg-slate-200 flex flex-row'>
        <Table Players={Players} Col={EquipeCol} Type='ucl' Team={Team} />
        <div className='w-[50%]   p-4 '>
          <select
            id='Team'
            onChange={onMutate}
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full focus:ring-green-500 focus:border-green-500 px-10 py-3'>
            <option className='text-rose-200'>Chose the {Path === '/team' ? ('Team'):('Country')}</option>
            {Path === '/team'
              ? TeamData.map((T,index) => <option key={index} value={T}>{T}</option>)
              : CountryData.map((T,index) => <option key={index} value={T}>{T}</option>)}
          </select>
          <button
            onClick={onSubmit}
            className='bg-rose-200 p-2 rounded-full ml-44 text-xl'>
            AddJson
          </button>
        </div>
      </div>
    </div>
  )
}
export default Equipe
