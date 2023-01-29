export const EquipeCol = [
  {
    type: "number",
    field: 'c',
    headerName: 'C',
    cellClassName: 'super-app-theme--cell',
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => {
      return params.row.c
    },
    width: 50,
  },
  {
    type: "string",
    field: 'name',
    headerName: 'Joueur',
    align: 'center',
    editable: 'true',
    headerAlign: 'center',
    width: 180,
  },
  {
    type: "string",
    field: 'national.name',
    headerName: 'National',
    align: 'center',
    headerAlign: 'center',
    width: 120,
    valueGetter: (params) => {
      return params.row.national.name
    },
  },
  {
    type: "number",
    field: 'national.goals',
    headerName: 'Goals',
    align: 'center',
    headerAlign: 'center',
    editable: 'true',
    width: 80,
    valueGetter: (params) => {
      return params.row.national.goals
    },
  },
  {
    type: "number",
    field: 'national.match',
    align: 'center',
    headerAlign: 'center',
    headerName: 'Match',
    editable: 'true',
    width: 80,
    valueGetter: (params) => {
      return params.row.national.match
    },
  },
  {
    type: "number",
    field: 'ratio',
    headerName: 'R',
    align: 'center',
    headerAlign: 'center',
    width: 80,
    valueGetter: (params) => {
      return (params.row.national.goals / params.row.national.match).toFixed(2)
    },
  },
]
