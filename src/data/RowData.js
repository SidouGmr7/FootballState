import { v4 as uuidv4 } from 'uuid'
import { serverTimestamp } from 'firebase/firestore'
export const PlayerData = {
  name: 'liwa',
  national: {
    name: 'portugal',
    goals: '300',
    match: '200',
  },
  team: {
    barcelona: {
      name: 'barcelona',
      goals: '500',
      match: '200',
    },
    bayern: {
      name: 'bayern',
      goals: '600',
      match: '200',
    },
  },
  timestamp: serverTimestamp(),
  id: uuidv4(),
}

export const TeamData = ['bayern', 'barcelona', 'realmadrid']
export const CountryData = ['portugal', 'argentina', 'poland']
