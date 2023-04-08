import {
    doc,
    serverTimestamp,
    setDoc,
    updateDoc,
    collection,
    where,
    query,
    getDocs,
} from "firebase/firestore"
import { db } from "../../firebase.config"
import { v4 as uuidv4 } from "uuid"
import { useFormik, FormikProvider } from "formik"
import { AddPlayerForm } from "./AddPlayerForm"

export const onSubmit = async (data, onEdit, fetchData, handleClose) => {
    try {
        if (onEdit) {
            await updateDoc(doc(db, "Player", data.uuid), data)
        } else {
            const queryRef = query(collection(db, "Player"), where("name", "==", data.name))
            getDocs(queryRef).then(async (querySnapshot) => {
                if (querySnapshot.size <= 0) {
                    await setDoc(doc(db, "Player", data.uuid), data)
                    alert(`${data.name} is added`)
                }
            })
            data["id"] = uuidv4()
        }
    } catch (error) {
        console.error(error)
    }
    fetchData && fetchData()
    handleClose && handleClose()
}

export const setInitiaValuesToTeamData = (team) => {
    if (!team) return []
    return team.map((t) => ({
        name: t.name || "",
        goals: t.goals || 0,
        match: t.match || 0,
    }))
}

function AddPlayer(props) {
    const { data, handleClose, fetchData } = props
    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
            position: data?.position || "Forward",
            national: {
                name: data?.national.name || "",
                goals: data?.national.goals || 0,
                match: data?.national.match || 0,
            },
            team: setInitiaValuesToTeamData(data?.team, "team"),
            team_count: data?.team_count || 1,
            lastUpdate: serverTimestamp(),
            uuid: data?.uuid || uuidv4(),
        },
        onSubmit: (values) => onSubmit(values, props.onEdit, fetchData, handleClose),
    })

    return (
        <FormikProvider value={formik}>
            <AddPlayerForm formik={formik} onEdit={props.onEdit} />
        </FormikProvider>
    )
}

export default AddPlayer
