export const EquipeCol = [
  {
    field: 'c',
    headerName: 'C',
    cellClassName: 'super-app-theme--cell',
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => {
      return params.row.c
    },
  },
  {
    field: 'name',
    headerName: 'Joueur',
    align: 'center',
    editable: 'true',
    headerAlign: 'center',
    width: 130,
  },
  {
    field: 'national',
    headerName: 'National',
    align: 'center',
    headerAlign: 'center',
    width: 160,
    valueGetter: (params) => {
      return params.row.national.name
    },
  },
  {
    field: 'goals',
    headerName: 'Goals',
    align: 'center',
    headerAlign: 'center',
    editable: 'true',
    width: 80,
  },
  {
    field: 'match',
    align: 'center',
    headerAlign: 'center',
    headerName: 'Match',
    editable: 'true',
    width: 80,
  },
  {
    field: 'ratio',
    headerName: 'R',
    align: 'center',
    headerAlign: 'center',
    width: 80,
    valueGetter: (params) => {
      return (params.row.goals / params.row.match).toFixed(2)
    },
  },
]
