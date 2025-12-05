import { useEffect, useState } from "react"
import CardPostulacion from "../CardPostulacion/CardPostulacion"
import { obtenerPostulacionesEgresado } from "../../services/postulacion"
import { useAccion } from "../../hooks/useAccion"
import DotLoader from "react-spinners/DotLoader"

const MiPostulaciones = () => {
    const [filter, setFilter] = useState("Todas")
    const [postulaciones, setPostulaciones] = useState([])
    const { ejecutar, cargando, error } = useAccion(obtenerPostulacionesEgresado)

    const filtros = [
        { label: "Todas", value: "Todas" },
        { label: "Enviadas", value: "Enviada" },
        { label: "En revisión", value: "En revisión" },
        { label: "Preseleccionado", value: "Preseleccionado" },
        { label: "Contratado", value: "Contratado" },
        { label: "Cancelada", value: "Cancelada" },
    ]

    useEffect(() => {
        const fetchData = async () => {
            const estadoParam = filter === "Todas" ? null : filter
            const res = await ejecutar({ estado: estadoParam })
            if (!res.error) {
                setPostulaciones(res.data.postulaciones)
            }
        }
        fetchData()
    }, [filter])

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Mis postulaciones</h2>
                <p className="text-sm md:text-base text-gray-600 mb-6">
                    Estados de tus postulaciones a ofertas de empleo
                </p>

                {error && (
                    <p className="text-red-600 mb-4">{error}</p>
                )}

                {/* Navbar de filtros */}
                <div className="bg-[#E8EBFD] rounded-xl md:rounded-full flex flex-wrap p-4 
                     items-center justify-between md:space-x-4 mb-8">
                    {filtros.map(f => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`cursor-pointer w-full md:w-auto px-4 py-1 rounded-full font-medium transition-all 
                                ${filter === f.value
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-700 hover:text-blue-600"
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cargando ? (
                        <div className="col-span-full flex flex-col justify-center items-center py-10 gap-4">
                            <DotLoader color="#1d4ed8" size={60} />
                            <p className="text-gray-700">Cargando postulaciones...</p>
                        </div>
                    ) : (
                        postulaciones.map((postulacion, index) => (
                            <CardPostulacion key={index} postulacion={postulacion} />
                        ))
                    )}
                </div>

                {!cargando && postulaciones.length === 0 && (
                    <p className="text-gray-500 text-center mt-10">
                        No hay postulaciones con el estado "{filter}".
                    </p>
                )}
            </div>
        </section>
    )
}

export default MiPostulaciones

