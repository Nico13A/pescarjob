import { FaMapPin, FaDollarSign, FaCalendar, FaBuilding, FaEye } from "react-icons/fa"
import { useAccion } from "../../hooks/useAccion"
import { crearPostulacion } from "../../services/postulacion"
import { toast } from "sonner"

const CardOfertaEgresado = ({ oferta }) => {

    const postular = useAccion(crearPostulacion)

    const handleVerDetalles = () => {
        console.log("Ver detalles de oferta:", oferta.idoferta)
    }

    const handlePostularse = async () => {
        const res = await postular.ejecutar({ idoferta: oferta.idoferta })
        if (res.error) {
            toast.error(res.error)
            return
        }
        toast.success("Postulación enviada con éxito")
    }

    return (
        <div className="rounded-xl border border-gray-300 p-4 md:p-6 flex flex-col justify-between space-y-3 w-full md:w-[49.5%] shadow h-[400px] bg-white">

            <h2 className="text-lg md:text-xl font-bold">{oferta.titulo}</h2>

            <div className="space-y-2">
                {/* Empresa */}
                <div className="flex justify-between items-center">
                    <p className="text-sm md:text-base text-gray-600 flex items-center gap-1">
                        <FaBuilding size={16} className="text-gray-700" />
                        {oferta.Empresa?.nombre_empresa}
                    </p>
                    <p className="text-sm md:text-base capitalize tracking-wide text-blue-950 font-semibold">
                        {oferta.modalidad}
                    </p>
                </div>

                {/* Ubicación */}
                <p className="text-sm md:text-base text-gray-600 flex items-center gap-1">
                    <FaMapPin className="text-blue-600" />
                    {oferta.ubicacion}
                </p>

                {/* Salario + Fecha */}
                <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <FaDollarSign className="text-green-600" />
                        {oferta.salario}
                    </span>

                    <span className="flex items-center gap-1 font-medium">
                        <FaCalendar className="text-gray-400" />
                        Cierra el: {new Date(oferta.fecha_fin).toLocaleDateString("es-AR")}
                    </span>
                </div>

                {/* Descripción */}
                <p className="text-gray-800 text-sm md:text-base line-clamp-3">
                    {oferta.descripcion}
                </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
                {oferta.Skills?.map(s => (
                    <span
                        key={s.idskill}
                        className="bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full"
                    >
                        {s.nombre}
                    </span>
                ))}
            </div>

            {/* Acciones */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-300 border-dashed">
                <span className="text-xs md:text-sm text-gray-600">
                    {oferta.postulaciones_count === 1
                        ? "1 postulación"
                        : `${oferta.postulaciones_count ?? 0} postulaciones`}
                </span>

                <div className="flex gap-2">
                    {/* Ver detalles */}
                    <button
                        onClick={handleVerDetalles}
                        className="px-3 md:px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 flex items-center gap-2 text-xs md:text-base cursor-pointer transition"
                    >
                        <FaEye size={14} className="hidden md:block" />
                        Ver detalles
                    </button>
                    {/* Postularse */}
                    <button
                        onClick={handlePostularse}
                        className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-xs md:text-base cursor-pointer transition"
                    >
                        Postularse
                    </button>

                </div>
            </div>

        </div>
    );
};

export default CardOfertaEgresado
