import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useLocation } from 'react-router-dom'

export default function DataTable({ Players, Col, Team }) {
  const Path = useLocation().pathname
  const Data = []
  if (Path === '/team') {
    Players.map(p => {
      if (p.team[Team]?.name === Team) {
        p.goals = p.team[Team].goals
        p.match = p.team[Team].match
        Data.push(p)
      }
    })
  }
  if (Path === '/national') {
    Players.map(p => {
      if (p.national?.name === Team) {
        p.goals = p.national.goals
        p.match = p.national.match
        Data.push(p)
      }
    })
  }
  Data.map((D, index) => (D.c = index + 1))
  function Edit(Player) {
    console.log(Player)
    updateDoc(doc(db, 'Equipe', Player.id), {
      [Player.field]: Player.value,
    })
    alert('Player ' + Player + ' Edit')
  }
  return (
    <div className='bg-slate-900 m-2 w-[70%]'>
      <DataGrid
        columns={Col}
        rows={Data}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellEditCommit={(p) => Edit(p)}
        sx={{
          color: 'white',
          p: 4,
          fontSize: 16,
          fontFamily: 'Montserrat',
          font: 'center',
          '& .MuiDataGrid-cell:hover': {
            color: 'red',
          },
        }}
        autoHeight
      />
    </div>
  )
}
