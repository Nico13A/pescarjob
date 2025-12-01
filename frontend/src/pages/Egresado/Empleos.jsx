import { useEffect, useState } from "react"
import { useAccion } from "../../hooks/useAccion"
import { obtenerOfertas } from "../../services/oferta"
import EgresadoLayout from "../../layout/EgresadoLayout"
import Hero from "../../components/Hero/Hero"
import CardOfertaEgresado from "../../components/CardOfertaEgresado/CardOfertaEgresado"
import Dropdown from "../../components/Dropdown/Dropdown"
import DropdownMultiSelect from "../../components/DropdownMultiSelect/DropdownMultiSelect"
import { MdOutlineClear } from "react-icons/md"

const provinciasArgentinas = [
    "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba",
    "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja",
    "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan",
    "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero",
    "Tierra del Fuego", "Tucumán"
]

const Empleos = () => {
    const listar = useAccion(obtenerOfertas)

    const [ofertasOriginales, setOfertasOriginales] = useState([])
    const [ofertasFiltradas, setOfertasFiltradas] = useState([])
    const [skills, setSkills] = useState([])
    const [busqueda, setBusqueda] = useState("")

    // Filtros
    const [filtroUbicacion, setFiltroUbicacion] = useState("")
    const [filtroModalidad, setFiltroModalidad] = useState("")
    const [filtrosSkills, setFiltrosSkills] = useState([])

    const cargarOfertas = async () => {
        try {
            const res = await listar.ejecutar()
            setOfertasOriginales(res.data)
            setOfertasFiltradas(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        cargarOfertas()
    }, [])

    // Cargar skills únicas
    useEffect(() => {
        if (ofertasOriginales.length > 0) {
            const allSkills = ofertasOriginales.flatMap(o => o.Skills)
            const nombres = allSkills.map(s => s.nombre)
            const unique = [...new Set(nombres)]
            setSkills(unique)
        }
    }, [ofertasOriginales])


    // FILTRADO AUTOMÁTICO
    useEffect(() => {
        let resultado = ofertasOriginales

        if (busqueda.trim() !== "") {
            const texto = busqueda.toLowerCase()
            resultado = resultado.filter(o =>
                o.titulo.toLowerCase().includes(texto)
            )
        }

        if (filtroUbicacion) {
            resultado = resultado.filter(o =>
                o.ubicacion.toLowerCase().includes(filtroUbicacion.toLowerCase())
            )
        }

        if (filtroModalidad) {
            resultado = resultado.filter(o =>
                o.modalidad.toLowerCase() === filtroModalidad.toLowerCase()
            )
        }

        if (filtrosSkills.length > 0) {
            resultado = resultado.filter(o => {
                const nombresSet = new Set(o.Skills.map(s => s.nombre));
                return filtrosSkills.every(skill => nombresSet.has(skill));
            })
        }
        setOfertasFiltradas(resultado)
    }, [busqueda, filtroUbicacion, filtroModalidad, filtrosSkills, ofertasOriginales])


    console.log(ofertasOriginales)

    return (
        <EgresadoLayout>
            <Hero
                titulo='Ofertas de empleo'
                descripcion={`Encuentra tu próxima oportunidad profesional. ${ofertasFiltradas.length} empleos disponibles.`}
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

                        {/* BOTÓN X */}
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
                            options={provinciasArgentinas}
                            value={filtroUbicacion}
                            onChange={setFiltroUbicacion}
                        />
                        <Dropdown
                            label="Modalidad"
                            options={["Remoto", "Presencial", "Híbrido"]}
                            value={filtroModalidad}
                            onChange={setFiltroModalidad}
                        />
                        <DropdownMultiSelect
                            label="Skills"
                            options={skills}
                            values={filtrosSkills}
                            onChange={setFiltrosSkills}
                        />
                    </div>
                </div>

                {/* Lista de ofertas */}
                <section className="flex flex-wrap justify-between space-y-4 pb-12">
                    {ofertasFiltradas.map(o => (
                        <CardOfertaEgresado key={o.idoferta} oferta={o} />
                    ))}
                </section>
            </div>

        </EgresadoLayout>
    )
}

export default Empleos
