import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"

const Dropdown = ({ label, options, value, onChange }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative w-full">
            <p className="text-sm font-semibold mb-1 text-gray-700 tracking-wider">{label}</p>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full border border-gray-300 rounded-xl p-2 bg-white flex justify-between items-center cursor-pointer"
            >
                <span>{value || "Seleccionar"}</span>
                <FaChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-xl shadow max-h-60 overflow-y-auto">
                    {/* OPCIÓN TODOS */}
                    <button
                        onClick={() => {
                            onChange("")   
                            setOpen(false)
                        }}
                        className="w-full text-left p-2 hover:bg-gray-100 font-semibold cursor-pointer"
                    >
                        Todas
                    </button>
                    <hr className="text-gray-300" />
                    {/* 🔵 OPCIONES */}
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => {
                                onChange(opt)
                                setOpen(false)
                            }}
                            className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown