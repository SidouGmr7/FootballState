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
import { TextField, SelectField, NumberField } from "../../Components/Fields/FormikFields"
import { positionData, countryData, teamData } from "../../data/RowData"
import { labelStyle } from "./tailwind"
import { Button } from "@material-ui/core"

export const onSubmit = async (data, onEdit) => {
    if (onEdit) {
        await updateDoc(doc(db, "Player", data.uuid), data)
        alert("Player " + data.name + " Edit")
    } else {
        const collectionRef = collection(db, "Player")
        const queryRef = query(collectionRef, where("name", "==", data.name))

        getDocs(queryRef).then(async (querySnapshot) => {
            if (querySnapshot.size > 0) {
            } else {
                await setDoc(doc(db, "Player", data.uuid), data)
            }
        })
        alert("tableData.length player was added")
        data["id"] = uuidv4()
    }
}

export const setInitiaValuesToTeamData = (team, fieldName) => {
    if (!team) return []
    return team.map((t) => ({
        name: t.name || "",
        goals: t.goals || 0,
        match: t.match || 0,
    }))
}

function AddPlayer(props) {
    const { player } = props
    const formik = useFormik({
        initialValues: {
            name: player?.name || "",
            position: player?.position || "Forward",
            national: {
                name: player?.national.name || "",
                goals: player?.national.goals || 0,
                match: player?.national.match || 0,
            },
            team: setInitiaValuesToTeamData(player?.team, "team"),
            team_count: player?.team_count || 1,
            lastUpdate: serverTimestamp(),
            uuid: player?.uuid || uuidv4(),
        },
        onSubmit: (values) => onSubmit(values, props.onEdit),
    })
    const teamSection = Array.from({ length: formik.values["team_count"] }, (_, index) => (
        <div className='flex mb-6' key={index}>
            <SelectField
                name='teamname'
                value={formik.values.team[index]?.name}
                choices={teamData}
                field={`team[${index}].name`}
            />
            <NumberField
                name='match'
                value={formik.values.team[index]?.match}
                field={`team[${index}].match`}
            />
            <NumberField
                name='goals'
                value={formik.values.team[index]?.goals}
                field={`team[${index}].goals`}
            />
        </div>
    ))
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className='max-w-md mx-4 my-4'>
                <label className={labelStyle}>Player status</label>
                <div className='flex mb-6'>
                    <TextField name='name' field='name' />
                    <SelectField
                        name='position'
                        field='position'
                        value={formik.values.position}
                        choices={positionData}
                    />
                </div>
                <label class={labelStyle}>Country</label>
                <div className='flex mb-6'>
                    <SelectField
                        name='nationalname'
                        choices={countryData}
                        value={formik.values.national.name}
                        field={`national.name`}
                    />
                    <NumberField name='match' field={`national.match`} value={formik.values.national.match} />
                    <NumberField name='goals' field={`national.goals`} value={formik.values.national.goals} />
                </div>
                <div className='flex mb-6'>
                    <SelectField
                        name='team count'
                        choices={[1, 2, 3, 4, 5, 6, 7]}
                        field='team_count'
                        value={formik.values.team_count}
                    />
                </div>
                {teamSection}
                <Button variant='contained' color='primary' type='submit'>
                    Add Player
                </Button>
            </form>
        </FormikProvider>
    )
}

export default AddPlayer
