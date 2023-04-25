import { db } from "../../firebase.config"
import { collection, getDocs, query } from "firebase/firestore"


export async function getData(collection){
  const docSnap = await getDocs(query(collection(db, collection)))
  const data = docSnap.docs.map((doc) => doc.data())
  return data
}


