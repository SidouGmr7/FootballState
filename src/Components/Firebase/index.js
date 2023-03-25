import { db } from "../../firebase.config"
import { collection, getDocs, query } from "firebase/firestore"


export async function getPlayer(){
  const docSnap = await getDocs(query(collection(db, "Player")))
  const players = docSnap.docs.map((doc) => doc.data())
  return players
}


