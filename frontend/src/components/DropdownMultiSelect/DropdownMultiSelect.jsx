import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"

const DropdownMultiSelect = ({ label, options, values, onChange }) => {
    const [open, setOpen] = useState(false)

    const toggleSkill = (skill) => {
        if (values.includes(skill)) {
            onChange(values.filter(s => s !== skill))
        } else {
            onChange([...values, skill])
        }
    }

    const resetSkills = () => onChange([])

    return (
        <div className="relative w-full">
            <p className="text-sm font-semibold mb-1 text-gray-700 tracking-wider">{label}</p>
            <button
                onClick={() => setOpen(prev => !prev)}
                className="w-full border border-gray-300 rounded-xl p-2 bg-white flex justify-between items-center cursor-pointer"
            >
                <span>
                    {values.length === 0
                        ? "Seleccionar"
                        : `${values.length} seleccionadas`}
                </span>
                <FaChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-xl shadow max-h-60 overflow-y-auto">
                    <button
                        onClick={() => {
                            resetSkills()
                            setOpen(false)
                        }}
                        className="w-full text-left p-2 hover:bg-gray-100 font-semibold cursor-pointer"
                    >
                        Todas
                    </button>
                    <hr className="text-gray-300" />
                    {/* CHECKBOXES */}
                    {options.map((opt) => (
                        <label
                            key={opt}
                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                        >
                            <input
                                type="checkbox"
                                checked={values.includes(opt)}
                                onChange={() => toggleSkill(opt)}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DropdownMultiSelect
