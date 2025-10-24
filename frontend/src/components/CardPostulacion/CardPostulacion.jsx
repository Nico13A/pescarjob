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
