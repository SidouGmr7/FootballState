import * as React from "react"
import { DataGrid } from "@mui/x-data-grid"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { useLocation } from "react-router-dom"

export default function DataTable({ Players, Col, Team }) {
  const Path = useLocation().pathname
  let Data
 
  // for get the player with the Team Selected
  if (Path === "/national")
    Data = Players.filter((p) => p.national.name === Team)

  // for generate the classement column
  Data.map((D, index) => (D.c = index + 1))

  // edit player data
  function Edit(Player) {
    console.log('Player',Player)
    updateDoc(doc(db, "Player", Player.id), {
      [Player.field]: Player.value,
    })
    console.log("Player " + Player.id + " Edit")
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
          color: "white",
          p: 4,
          fontSize: 16,
          fontFamily: "Montserrat",
          font: "center",
          "& .MuiDataGrid-cell:hover": {
            color: "red",
          },
        }}
        autoHeight
      />
    </div>
  )
}
