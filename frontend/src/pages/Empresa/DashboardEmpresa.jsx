import { useState, useEffect } from "react"
import EmpresaLayout from "../../layout/EmpresaLayout"
import { obtenerOfertas } from "../../services/oferta"
import { useAccion } from "../../hooks/useAccion"
import Hero from "../../components/Hero/Hero"
import { useNavigate } from "react-router-dom"
import OfertaCard from "../../components/OfertaCard/OfertaCard"
import { eliminarOferta } from "../../services/oferta"
import Swal from "sweetalert2"

const DashboardEmpresa = () => {
    const navigate = useNavigate()
    const listar = useAccion(obtenerOfertas)
    const eliminar = useAccion(eliminarOferta)

    const [ofertas, setOfertas] = useState([])

    const [tab, setTab] = useState("ofertas")

    const stats = [
        { title: "Ofertas activas", value: 24 },
        { title: "Total de postulaciones", value: 10 },
        { title: "Pendientes", value: 14 },
        { title: "Tasa de respuesta", value: 320 },
    ]

    useEffect(() => {
        const fetchOfertas = async () => {
            const res = await listar.ejecutar()
            if (!res.error) {
                setOfertas(res.data)
            }
        }
        fetchOfertas()
    }, [])

    const handleEditar = (id) => {
        navigate(`/empresa/editar-oferta/${id}`);
    };

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar oferta?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
        })
        if (!result.isConfirmed) return
        const res = await eliminar.ejecutar(id)
        if (res?.success) {
            setOfertas(prev => prev.filter(o => o.idoferta !== id))
            Swal.fire({
                title: "Eliminada",
                text: "La oferta fue eliminada correctamente.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            })
        }
    }

    const postulacionesEjemplo = [
        {
            id: 1,
            nombre: "María López",
            puesto: "Desarrollador Frontend",
            fecha_postulacion: "2025-10-22",
            estado: "Pendiente",
        },
        {
            id: 2,
            nombre: "Juan Pérez",
            puesto: "Diseñador UX/UI",
            fecha_postulacion: "2025-10-25",
            estado: "Revisado",
        },
        {
            id: 3,
            nombre: "Lucía Fernández",
            puesto: "Backend Developer",
            fecha_postulacion: "2025-10-27",
            estado: "Entrevista programada",
        },
    ]

    return (
        <EmpresaLayout>
            <Hero
                titulo="Panel de empresa"
                descripcion="Gestiona tus ofertas de empleo y postulaciones."
                stats={stats}
            >
                <button
                    className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-full shadow transition-all"
                    onClick={() => navigate('/empresa/crear-oferta')}
                >
                    Crear oferta
                </button>
            </Hero>

            {/* Tabs */}
            <div className="bg-[#E8EBFD] rounded-full flex flex-wrap p-4 items-center justify-center md:space-x-4 mb-8 max-w-7xl mx-auto">
                <button
                    onClick={() => setTab("ofertas")}
                    className={`text-sm md:text-lg flex-1 cursor-pointer px-4 py-1 rounded-full font-medium transition-all ${tab === "ofertas"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:text-blue-600"
                        }`}
                >
                    Mis ofertas
                </button>

                <button
                    onClick={() => setTab("postulaciones")}
                    className={`text-sm md:text-lg flex-1 cursor-pointer px-4 py-1 rounded-full font-medium transition-all ${tab === "postulaciones"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:text-blue-600"
                        }`}
                >
                    Postulaciones
                </button>
            </div>

            <section className="max-w-7xl mx-auto px-4">
                {tab === "ofertas" ? (
                    <div className="grid gap-4">
                        {ofertas.map((o) => (
                            <OfertaCard key={o.idoferta} oferta={o} onEliminar={() => handleEliminar(o.idoferta)} onEditar={() => handleEditar(o.idoferta)}  />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {postulacionesEjemplo.map((p) => (
                            <div
                                key={p.id}
                                className="p-4 bg-white rounded-xl shadow flex flex-col md:flex-row justify-between"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">{p.nombre}</h3>
                                    <p className="text-sm text-gray-600">
                                        Postulado a: {p.puesto}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500 mt-2 md:mt-0">
                                    {p.fecha_postulacion} | Estado: {p.estado}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

        </EmpresaLayout>
    )
}

export default DashboardEmpresa
