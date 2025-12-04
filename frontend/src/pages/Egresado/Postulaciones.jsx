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
    const { ejecutar, cargando, error } = useAccion(obtenerPostulacionesEgresado)

    useEffect(() => {
        const cargar = async () => {
            const res = await ejecutar()
            if (!res.error) setPostulaciones(res.data)
        }
        cargar()
    }, [])

    return (
        <EgresadoLayout>
            <Hero
                titulo='Mis postulaciones'
                descripcion='Revisa el estado de tus postulaciones y sigue el progreso de cada oportunidad laboral.'
            />

            <div className="mt-4 max-w-7xl mx-auto pb-12 min-h-[300px]">
                {cargando ? (
                    /* LOADER */
                    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
                        <DotLoader color="#1d4ed8" size={60} />
                        <p className="text-gray-700">Cargando postulaciones...</p>
                    </div>
                ) : error ? (
                    /* ERROR */
                    <p className="text-red-500 text-center">{error}</p>
                ) : postulaciones.length === 0 ? (
                    /* VACÍO */
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
                    /* LISTA */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {postulaciones.map(p => (
                            <CardPostulacion key={p.idpostulacion} postulacion={p} />
                        ))}
                    </div>
                )}
            </div>

        </EgresadoLayout>
    )
}

export default Postulaciones



