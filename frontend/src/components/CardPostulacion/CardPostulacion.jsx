/*
const CardPostulacion = ({ post, getEstadoColor }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold">{post.puesto}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(
            post.estado
          )}`}
        >
          {post.estado}
        </span>
      </div>

      <div className="mt-3 text-gray-600 space-y-1 text-sm md:text-base">
        <p>
          <strong>Empresa:</strong> {post.empresa}
        </p>
        <p>
          <strong>Lugar:</strong> {post.lugar}
        </p>
        <p>
          <strong>Fecha de aplicación:</strong> {post.fecha}
        </p>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <p className="text-blue-600 font-bold">{post.precio}</p>
        <button className="text-blue-600 font-medium hover:underline">
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default CardPostulacion;
*/

import { FaMapPin, FaDollarSign, FaCalendar, FaBuilding } from "react-icons/fa"

const CardPostulacion = ({ postulacion }) => {

    const estadoActual = postulacion.estados[0]

    const getEstadoClases = (estado) => {
        const base = "px-4 py-2 text-xs font-semibold rounded-full"
        const map = {
            "Enviada": "bg-blue-100 text-blue-700",
            "En revisión": "bg-yellow-100 text-yellow-800",
            "Preseleccionado": "bg-purple-100 text-purple-800",
            "Contratado": "bg-green-100 text-green-800",
            "Rechazada": "bg-red-100 text-red-800",
            "Cancelada": "bg-gray-200 text-gray-700",
        }
        return `${base} ${map[estado] || "bg-gray-100 text-gray-800"}`
    }

    const oferta = postulacion.oferta

    return (
        <div className="
            rounded-xl border border-gray-300 p-4 md:p-6 
            flex flex-col justify-between space-y-3 
            w-full shadow bg-white
        ">
            {/* Título */}
            <h2 className="text-lg md:text-xl font-bold">
                {oferta.titulo}
            </h2>

            <div className="space-y-2">
                {/* Empresa */}
                <div className="flex justify-between items-center">
                    <p className="text-sm md:text-base text-gray-600 flex items-center gap-1">
                        <FaBuilding size={16} className="text-gray-700" />
                        {oferta.Empresa?.nombre_empresa}
                    </p>

                    {/* Estado */}
                    <span className={getEstadoClases(estadoActual?.estado)}>
                        {estadoActual?.estado}
                    </span>
                </div>

                {/* Ubicación */}
                <p className="text-sm md:text-base text-gray-600 flex items-center gap-1">
                    <FaMapPin className="text-blue-600" />
                    {oferta.ubicacion}
                </p>

                {/* Salario + Fecha */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <FaDollarSign className="text-green-600" />
                        {oferta.salario}
                    </span>

                    <span className="flex items-center gap-1 font-medium">
                        <FaCalendar className="text-gray-400" />
                        Cierra el: {new Date(oferta.fecha_fin).toLocaleDateString("es-AR")}
                    </span>
                </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 pt-1">
                {oferta.Skills?.map(s => (
                    <span
                        key={s.idskill}
                        className="bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full"
                    >
                        {s.nombre}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div className="
                flex justify-between items-center pt-3 
                border-t border-gray-300 border-dashed
            ">
                <span className="text-xs md:text-sm text-gray-600">
                    Fecha de postulación:{" "}
                    {new Date(postulacion.fecha_postulacion).toLocaleDateString("es-AR")}
                </span>
            </div>
        </div>
    )
}

export default CardPostulacion
