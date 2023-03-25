import { useFormikContext } from "formik"

let inputstyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"

export const SelectField = (props) => {
    const { name, choices, field } = props
    const setFieldValue = useFormikContext()?.setFieldValue
    return (
        <div>
            <select
                name={name}
                className={`${inputstyle} w-full px-10 py-3`}
                onChange={(event) => setFieldValue(field, event.target.value)}
                required={true}
                {...props}>
                {props.extraValue}
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
