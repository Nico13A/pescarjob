import { FaUsers, FaEdit, FaTrash } from "react-icons/fa"
const OfertaCard = ({ oferta, onEliminar, onEditar }) => {

    const estadoColor = {
        Activa: "bg-green-100 text-green-700",
        Cerrada: "bg-red-100 text-red-700",
        Suspendida: "bg-gray-400 text-gray-700",
    }

    return (
        <div className="p-4 bg-white rounded-xl shadow flex flex-col md:flex-row justify-between">
            <div className="flex flex-col gap-3 w-full max-w-md xl:max-w-2xl">
                <h3 className="text-lg font-semibold">{oferta.titulo}</h3>
                <p className="text-sm text-gray-600">{oferta.descripcion}</p>

                <div className="flex flex-col md:flex-row items-start md:items-center text-sm gap-2 md:gap-4">
                    <p className="font-semibold">
                        Ubicación: <span className="font-normal">{oferta.ubicacion}</span>
                    </p>
                    <div className="hidden md:block w-[2px] h-4 bg-gray-900"></div>
                    <p className="font-semibold">
                        Modalidad: <span className="capitalize font-normal">{oferta.modalidad}</span>
                    </p>
                </div>

                <p className="text-sm font-semibold">
                    Estado:{" "}
                    <span className={`text-xs font-normal rounded-full py-1 px-2 ${estadoColor[oferta.estado]}`}>
                        {oferta.estado}
                    </span>
                </p>
            </div>

            <div className="flex flex-col justify-between items-end mt-3 md:mt-0">
                <p className="text-sm text-gray-400 mb-3 md:mb-0">
                    Publicada:{" "}
                    {new Date(oferta.fecha_inicio).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>

                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">

                    {/* Ver postulaciones */}
                    <button  
                        onClick={() => console.log("Ver postulaciones")}
                        className="text-sm px-3 py-1 border border-blue-300 rounded-xl text-blue-700 cursor-pointer flex items-center gap-2 transition hover:bg-blue-100"
                    >
                        <FaUsers size={16} />
                        Ver postulaciones
                    </button>

                    {/* Editar */}
                    <button
                        onClick={onEditar}
                        className="text-sm px-3 py-1 border border-gray-700 rounded-xl text-[#373737] cursor-pointer flex items-center gap-2 transition hover:bg-gray-100"
                    >
                        <FaEdit size={16} />
                        Editar
                    </button>

                    {/* Eliminar */}
                    <button
                        onClick={onEliminar}
                        className="text-sm px-3 py-1 border border-red-500 rounded-xl text-red-600 cursor-pointer flex items-center gap-2 hover:bg-red-50"
                    >
                        <FaTrash size={16} />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfertaCard