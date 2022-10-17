import { useState } from 'react'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { v4 as uuidv4 } from 'uuid'
import { IoAdd } from 'react-icons/io5'
import { IoRemove } from 'react-icons/io5'

function AddPlayer() {
  const InputSection = ({ index, Service, Name }) => {
    return (
      <div className='flex flex-row mt-6 gap-4'>
        <input
          key={index}
          className={input}
          type='text'
          id='name'
          placeholder='Name'
          value={Service}
          onChange={(e) => enMuteMult(e, index)}
          required
        />
        <input
          key={index}
          className={input}
          type='number'
          id='goals'
          placeholder='Goals'
          value={Service}
          onChange={(e) => enMuteMult(e, index)}
          required
        />
        <input
          key={index}
          className={input}
          type='number'
          id='match'
          placeholder='Match'
          value={Service}
          onChange={(e) => enMuteMult(e, index)}
          required
        />
      </div>
    )
  }

  const label =
    'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
  const input =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5'
  // eslint-disable-next-line
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    national: {},
    ucl: {},
    ligue: {},
  })

  const { name, position, national, ucl, ligue } = formData

  const onSubmit = async (e) => {
    e.preventDefault()

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
      id: uuidv4(),
    }
    await setDoc(doc(db, 'Player', formDataCopy.id), formDataCopy)
    alert('Player Added')
    // navigate(`/national`)
  }

  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const onMutatearray = (e, array) => {
    array[e.target.id] = e.target.value
    setFormData((prevState) => ({
      ...prevState,
      [array]: array,
    }))
  }
  const enMuteMult = (e, index) => {
    const list = [...Service]
    list[index][e.target.id] = e.target.value
    setFormData((prevState) => ({
      ...prevState,
      Team: list,
    }))
  }

  const [Service, setService] = useState([{ service: '' }])
  const [EquipeIndex, setEquipeIndex] = useState(0)
  const AddService = () => {
    setService([...Service, { service: '' }])
  }
  const RemoveService = (index) => {
    const list = [...Service]
    list.splice(index, 1)
    setService(list)
  }

  return (
    <div className='h-screen'>
      <form onSubmit={onSubmit} className='w-full max-w-lg mx-52 my-20'>
        <label className={label}>Player status</label>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <input
              className={input}
              type='text'
              placeholder='Name'
              id='name'
              value={name}
              onChange={onMutate}
              required
            />
          </div>
          <div classname='w-full md:w-1/2 px-8'>
            <select
              id='position'
              value={position}
              onChange={onMutate}
              required
              className={`${input} w-full px-10 py-3`}>
              <option>Chose the Position</option>
              <option>Forward</option>
              <option>Midfielder</option>
              <option>Defender</option>
              <option>Goalkeeper</option>
            </select>
          </div>
        </div>
        <label class={label}>Country</label>
        <div className='flex  mb-6'>
          <div classname='w-full md:w-1/2 px-8'>
            <select
              id='name'
              value={national.name}
              onChange={(e) => onMutatearray(e, national)}
              required
              className={`${input} w-full px-10 py-3`}>
              <option>Chose the country</option>
              <option>Spain</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </select>
          </div>
          <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
            <input
              className={input}
              type='number'
              id='match'
              placeholder='Match'
              value={national.match}
              onChange={(e) => onMutatearray(e, national)}
              required
            />
          </div>
          <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
            <input
              className={input}
              type='number'
              placeholder='Goals'
              id='goals'
              value={national.goals}
              onChange={(e) => onMutatearray(e, national)}
              required
            />
          </div>
        </div>
        <label className={label}>Team</label>
        <div className='flex flex-row gap-4'>
          <button
            type='submit'
            className='h-full rounded-full ml-2 bg-green-500 hover:bg-green-700 text-white font-bold p-4 mb-4'
            onClick={AddService}>
            <IoAdd />
          </button>
          {Service.map((singleService, index) => (
            <div className='mr-2'>
              {Service.length > index && (
                <button
                  type='submit'
                  className={`w-12 rounded-full bg-blue-300 hover:bg-blue-500 text-white font-bold p-4 mb-4 ${
                    EquipeIndex == index ? '' : 'opacity-40'
                  }`}
                  onClick={() => setEquipeIndex(index)}>
                  {index}
                </button>
              )}
              <div
                className={`absolute mb-2 ${
                  EquipeIndex == index ? 'flex flex-col' : 'hidden'
                }`}>
                <div className='flex flex-row w-[57%] justify-between  gap-[10rem]'>
                  <input
                    key={index}
                    className={input}
                    type='text'
                    id='name'
                    placeholder='Name'
                    value={singleService.Service}
                    onChange={(e) => enMuteMult(e, index)}
                    required
                  />
                  <button
                    type='submit'
                    className='w-12 rounded-full bg-rose-500 hover:bg-rose-700 text-white font-bold p-4 '
                    onClick={() => RemoveService(index)}>
                    <IoRemove />
                  </button>
                </div>
                <InputSection
                  Service={singleService.Service}
                  index={index}
                  Name='Ligue'
                />
                <InputSection
                  Service={singleService.Service}
                  index={index}
                  Name='Ucl'
                />
                <InputSection
                  Service={singleService.Service}
                  index={index}
                  Name='Cup'
                />
                <InputSection
                  Service={singleService.Service}
                  index={index}
                  Name='Other'
                />
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
    </div>
  )
}

export default AddPlayer
