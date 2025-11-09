import { useState } from "react";
import CardPostulacion from "../CardPostulacion/CardPostulacion";

const MiPostulaciones = () => {
    const [filter, setFilter] = useState("Todas");

    const filtros = [
        { label: "Todas", value: "Todas" },
        { label: "Pendientes", value: "Pendiente" },
        { label: "En revisión", value: "En revisión" },
        { label: "Aceptadas", value: "Aceptada" },
        { label: "Rechazadas", value: "Rechazada" },
    ];


    const postulaciones = [
        {
            puesto: "Desarrollador Frontend React",
            empresa: "TechCorp",
            lugar: "Buenos Aires",
            fecha: "23/10/2025",
            precio: "$120.000",
            estado: "En revisión",
        },
        {
            puesto: "Backend Node.js",
            empresa: "SoftSolutions",
            lugar: "Córdoba",
            fecha: "20/10/2025",
            precio: "$110.000",
            estado: "Pendiente",
        },
        {
            puesto: "Diseñador UX/UI",
            empresa: "Creative Studio",
            lugar: "Rosario",
            fecha: "15/10/2025",
            precio: "$95.000",
            estado: "Rechazada",
        },
        {
            puesto: "Desarrollador Full Stack",
            empresa: "InnovaTech",
            lugar: "Mendoza",
            fecha: "10/10/2025",
            precio: "$130.000",
            estado: "Aceptada",
        },
        {
            puesto: "QA Tester Manual",
            empresa: "QualitySoft",
            lugar: "La Plata",
            fecha: "12/10/2025",
            precio: "$100.000",
            estado: "Pendiente",
        },
        {
            puesto: "Analista de Datos",
            empresa: "DataSolutions",
            lugar: "Tucumán",
            fecha: "08/10/2025",
            precio: "$125.000",
            estado: "En revisión",
        },
        {
            puesto: "Administrador de Sistemas",
            empresa: "SecureNet",
            lugar: "Mar del Plata",
            fecha: "05/10/2025",
            precio: "$115.000",
            estado: "Aceptada",
        },
        {
            puesto: "Soporte Técnico Nivel 1",
            empresa: "HelpDeskPro",
            lugar: "Salta",
            fecha: "03/10/2025",
            precio: "$90.000",
            estado: "Rechazada",
        },
    ];


    const filtradas =
        filter === "Todas"
            ? postulaciones
            : postulaciones.filter((p) => p.estado === filter);

    const getEstadoColor = (estado) => {
        switch (estado) {
            case "Pendiente":
                return "bg-yellow-100 text-yellow-800";
            case "En revisión":
                return "bg-blue-100 text-blue-800";
            case "Aceptada":
                return "bg-green-100 text-green-800";
            case "Rechazada":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Mis postulaciones</h2>
                <p className="text-sm md:text-base text-gray-600 mb-6">
                    Estado de todas tus postulaciones a ofertas de empleo
                </p>

                {/* Navbar de filtros */}
                <div className="bg-[#E8EBFD] rounded-full flex flex-wrap p-4 items-center justify-between md:space-x-4 mb-8">
                    {filtros.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`cursor-pointer w-full md:w-auto px-4 py-1 rounded-full font-medium transition-all ${filter === f.value
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-gray-700 hover:text-blue-600"
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Cards de postulaciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtradas.map((post, index) => (
                        <CardPostulacion key={index} post={post} getEstadoColor={getEstadoColor} />
                    ))}
                </div>

                {/* Si no hay resultados */}
                {filtradas.length === 0 && (
                    <p className="text-gray-500 text-center mt-10">
                        No hay postulaciones con el estado "{filter}".
                    </p>
                )}
            </div>
        </section>
    );
};

export default MiPostulaciones;

