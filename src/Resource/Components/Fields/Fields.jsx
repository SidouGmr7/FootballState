let inputstyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"

export const SelectField = (props) => {
    const { name, choices } = props
    return (
        <div>
            <select name={name} className={`${inputstyle} w-full px-10 py-3`} required={true} {...props}>
                {props.children}
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
