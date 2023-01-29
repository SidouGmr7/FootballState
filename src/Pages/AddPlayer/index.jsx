import { useState, useEffect } from "react"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../../firebase.config"
import { v4 as uuidv4 } from "uuid"
import { IoAdd, IoRemove } from "react-icons/io5"
import { useFormik, FormikProvider } from "formik"
import { TextField, SelectField, NumberField } from "./Fields"
import { PositionData, TeamData, CountryData } from "../../data/RowData"
import { labelStyle, addButton, removeButton, changeButton } from "./tailwind"
function AddPlayer() {
  const formik = useFormik({
    initialValues: {
      name: "",
      position: "Forward",
      national: { name: "", goals: 0, match: 0 },
      team: {},
      lastUpdate: serverTimestamp(),
      id: uuidv4(),
    },
    onSubmit: async (values) => {
      await setDoc(doc(db, "Player", values.id), values)
      values["id"] = uuidv4()
      alert("Player Added")
    },
  })

  const [Service, setService] = useState([{ service: "" }])
  const [EquipeIndex, setEquipeIndex] = useState(0)
  const AddService = () => {
    setService([...Service, { service: "" }])
  }
  const RemoveService = (index) => {
    const list = [...Service]
    list.splice(index, 1)
    setService(list)
  }
  return (
    <div className='h-screen'>
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className='w-full max-w-lg mx-52 my-20'>
          <label className={labelStyle}>Player status</label>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <TextField name='name' field={`name`} />
            <SelectField
              name='position'
              field={`position`}
              choices={PositionData}
            />
          </div>
          <label class={labelStyle}>Country</label>
          <div className='flex  mb-6'>
            <SelectField
              name='nationalname'
              choices={CountryData}
              field={`national.name`}
            />
            <NumberField name='match' field={`national.match`} />
            <NumberField name='goals' field={`national.goals`} />
          </div>
          <label className={labelStyle}>Team</label>
          <div className='flex flex-row gap-4'>
            {Service.length < 6 && (
              <button className={addButton} onClick={AddService}>
                <IoAdd />
              </button>
            )}
            {Service.map((singleService, index) => (
              <div className='mr-2'>
                {Service.length > index && (
                  <button
                    className={
                      changeButton +
                      ` ${EquipeIndex === index ? "" : "opacity-40"}`
                    }
                    onClick={() => setEquipeIndex(index)}>
                    Team{index + 1}
                  </button>
                )}
                <div
                  className={`absolute mb-2 ${
                    EquipeIndex === index ? "flex flex-col" : "hidden"
                  }`}>
                  <div className='flex flex-row justify-between  gap-[10rem]'>
                    <TextField name='team' field={`team[${index}].name`} />
                    <TextField name='goals' field={`team[${index}].goals`} />
                    <button
                      className={removeButton}
                      onClick={() => RemoveService(index)}>
                      <IoRemove />
                    </button>
                  </div>
                  {/* <NumberField
                    field={singleService.Service}
                    index={index}
                    Name='Ligue'
                  />
                  <NumberField
                    field={singleService.Service}
                    index={index}
                    Name='Ucl'
                  />
                  <NumberField
                    field={singleService.Service}
                    index={index}
                    Name='Cup'
                  />
                  <NumberField
                    field={singleService.Service}
                    index={index}
                    Name='Other'
                  /> */}
                </div>
              </div>
            ))}
          </div>
          <button
            type='submit'
            className='mt-96 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'>
            Add Player
          </button>
        </form>
      </FormikProvider>
    </div>
  )
}

export default AddPlayer
