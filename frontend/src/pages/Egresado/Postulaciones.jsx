import { useEffect, useState } from "react"
import { obtenerPostulacionesEgresado } from "../../services/postulacion"
import { useAccion } from "../../hooks/useAccion"
import EgresadoLayout from "../../layout/EgresadoLayout"
import Hero from "../../components/Hero/Hero"
import CardPostulacion from "../../components/CardPostulacion/CardPostulacion"
import DotLoader from "react-spinners/DotLoader"
import { Briefcase } from "lucide-react"
import { Link } from "react-router-dom"

const Postulaciones = () => {
    const [postulaciones, setPostulaciones] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const limit = 9

    const { ejecutar, cargando, error } = useAccion(obtenerPostulacionesEgresado)

    const cargar = async () => {
        const res = await ejecutar({ page, limit })
        if (!res.error) {
            setPostulaciones(res.data.postulaciones)
            setTotal(res.data.total)
        }
    }

    useEffect(() => {
        cargar()
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [page])

    return (
        <EgresadoLayout>
            <Hero
                titulo='Mis postulaciones'
                descripcion='Revisa el estado de tus postulaciones y sigue el progreso de cada oportunidad laboral.'
            />
            <section className="mt-4 max-w-7xl mx-auto min-h-[300px]">
                {cargando ? (
                    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
                        <DotLoader color="#1d4ed8" size={60} />
                        <p className="text-gray-700">Cargando postulaciones...</p>
                    </div>
                ) : error ? (
                    <p className="text-red-600 mb-4 text-center">{error}</p>
                ) : postulaciones.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
                        <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                            <Briefcase className="w-10 h-10" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800">
                            Aún no te has postulado
                        </h3>

                        <p className="text-gray-600 mt-2 max-w-sm">
                            Explora las ofertas disponibles y encuentra tu próxima oportunidad laboral.
                        </p>

                        <Link
                            to="/egresado/empleos"
                            className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Ver ofertas disponibles
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {postulaciones.map(p => (
                                <CardPostulacion key={p.idpostulacion} postulacion={p} />
                            ))}
                        </div>
                        {/* PAGINACIÓN */}
                        <div className="flex justify-center gap-3 pb-12 items-center mt-10">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className="text-sm w-auto md:text-base md:w-[180px] px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold tracking-wider rounded-xl disabled:opacity-80 cursor-pointer"
                            >
                                Anterior
                            </button>

                            <span className="hidden md:block md:w-[180px] text-center px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-bold shadow-sm border border-blue-200 tracking-wider transition-all duration-200">
                                Página {page}
                            </span>

                            <button
                                disabled={(page * limit) >= total}
                                onClick={() => setPage(p => p + 1)}
                                className="text-sm w-auto md:text-base md:w-[180px] px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold tracking-wider rounded-xl disabled:opacity-80 cursor-pointer"
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </section>
        </EgresadoLayout>
    )
}

export default Postulaciones




