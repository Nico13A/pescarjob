import { useEffect, useState } from "react"
import { useAccion } from "../../hooks/useAccion"
import { obtenerOfertas } from "../../services/oferta"
import EgresadoLayout from "../../layout/EgresadoLayout"
import Hero from "../../components/Hero/Hero"
import CardOfertaEgresado from "../../components/CardOfertaEgresado/CardOfertaEgresado"
import Dropdown from "../../components/Dropdown/Dropdown"
import { MdOutlineClear } from "react-icons/md"
import provinciasData from "../../data/provinciasData"
import DotLoader from "react-spinners/DotLoader"

const Empleos = () => {
    const listar = useAccion(obtenerOfertas)

    // Estados principales
    const [ofertas, setOfertas] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const pageSize = 8
    const [busqueda, setBusqueda] = useState("")

    // Filtros
    const [filtroUbicacion, setFiltroUbicacion] = useState("")
    const [filtroModalidad, setFiltroModalidad] = useState("")

    // ==========================
    // Cargar ofertas del backend
    // ==========================
    const cargarOfertas = async () => {
        try {
            const res = await listar.ejecutar({
                page,
                pageSize,
                search: busqueda || undefined,
                ubicacion: filtroUbicacion || undefined,
                modalidad: filtroModalidad || undefined,
            })
            setOfertas(res.data.ofertas)
            setTotal(res.data.total)
        } catch (error) {
            console.error(error)
        }
    }

    // Cargar ofertas cuando cambia la página
    useEffect(() => {
        cargarOfertas()
    }, [page])

    // Resetear y cargar ofertas cuando cambia un filtro
    useEffect(() => {
        setPage(1)
        cargarOfertas()
    }, [busqueda, filtroUbicacion, filtroModalidad])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [ofertas])


    return (
        <EgresadoLayout>
            <Hero
                titulo='Ofertas de empleo'
                descripcion={`Encuentra tu próxima oportunidad profesional. ${total} empleos disponibles.`}
            />

            <div className="max-w-7xl mx-auto">
                <div className="pb-10">
                    {/* Buscador */}
                    <div className="relative w-full mb-4">
                        <input
                            id="buscador"
                            name="buscador"
                            type="text"
                            className="bg-white border border-gray-300 w-full rounded-xl px-4 py-2 pr-10"
                            placeholder="Buscar empleo..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />

                        {busqueda !== "" && (
                            <button
                                type="button"
                                onClick={() => setBusqueda("")}
                                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                <MdOutlineClear />
                            </button>
                        )}
                    </div>

                    {/* Filtros */}
                    <div className="flex flex-col gap-4 md:w-1/2 md:ml-auto md:flex-row md:pl-2">
                        <Dropdown
                            label="Ubicación"
                            options={provinciasData}
                            value={filtroUbicacion}
                            onChange={setFiltroUbicacion}
                        />
                        <Dropdown
                            label="Modalidad"
                            options={["Remoto", "Presencial", "Híbrido"]}
                            value={filtroModalidad}
                            onChange={setFiltroModalidad}
                        />
                    </div>
                </div>

                {/* Lista de ofertas */}
                <section
                    className={`pb-6 min-h-[300px] ${listar.cargando
                            ? "flex items-center justify-center"       
                            : "flex flex-wrap justify-between space-y-4"
                        }`}
                >
                    {listar.cargando ? (
                        <div className="flex flex-col items-center gap-4">
                            <DotLoader color="#1d4ed8" size={60} />
                            <p className="text-gray-700">Cargando ofertas...</p>
                        </div>
                    ) : !listar.cargando && ofertas.length === 0 ? (
                        <p className="text-gray-700 text-center w-full">
                            No se encontraron ofertas.
                        </p>
                    ) : (
                        ofertas.map((o) => (
                            <CardOfertaEgresado key={o.idoferta} oferta={o} />
                        ))
                    )}
                </section>

                {/* Paginación */}
                <div className="flex justify-center gap-3 pb-12 items-center">
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
                        disabled={(page * pageSize) >= total}
                        onClick={() => setPage(p => p + 1)}
                        className="text-sm w-auto md:text-base md:w-[180px] px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold tracking-wider rounded-xl disabled:opacity-80 cursor-pointer"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </EgresadoLayout>
    )
}

export default Empleos
