import { useFormikContext } from "formik"
// import { MenuItem } from "@material-ui/core"

let inputstyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"

export const TextField = ({ name, field }) => {
    const { setFieldValue, values } = useFormikContext()
    return (
        <div className='w-full md:w-1/2 px-3'>
            <input
                name={name}
                placeholder={name}
                className={inputstyle}
                type='text'
                onChange={(event) => setFieldValue(field, event.target.value)}
                value={values[field] || ''}
                required
            />
        </div>
    )
}

export const SelectField = ({ name, choices, field, value }) => {
    const { setFieldValue } = useFormikContext()
    return (
        <div classname='w-full md:w-1/2'>
            <select
                name={name}
                className={`${inputstyle} px-10 py-3`}
                onChange={(event) => setFieldValue(field, event.target.value)}
                required
                value={value}>
                <option className='text-rose-200'>Chose...</option>
                {choices &&
                    choices.map((choice) => {
                        return (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        )
                    })}
            </select>
        </div>
    )
}

export const NumberField = ({ name, field, value }) => {
    const { setFieldValue } = useFormikContext()
    return (
        <div className=' md:w-1/4 px-3 mb-6 md:mb-0'>
            <input
                name={name}
                placeholder={name}
                className={inputstyle}
                type='number'
                onChange={(event) => setFieldValue(field, event.target.value)}
                value={value || 0}
                required
            />
        </div>
    )
}

// const InputSection = ({ index, Service, Name }) => {
//     return (
//       <div className='flex flex-row mt-6 gap-4'>
//         <input
//           key={index}
//           className={input}
//           type='text'
//           id='name'
//           placeholder='Name'
//           value={Service}
//           onChange={(e) => enMuteMult(e, index)}
//           required
//         />
//         <input
//           key={index}
//           className={input}
//           type='number'
//           id='goals'
//           placeholder='Goals'
//           value={Service}
//           onChange={(e) => enMuteMult(e, index)}
//           required
//         />
//         <input
//           key={index}
//           className={input}
//           type='number'
//           id='match'
//           placeholder='Match'
//           value={Service}
//           onChange={(e) => enMuteMult(e, index)}
//           required
//         />
//       </div>
//     )
//   }
