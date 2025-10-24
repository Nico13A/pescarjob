const CardEstadoPostulacion = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center hover:shadow-md transition-shadow duration-200">
      <p className="text-gray-500 font-medium">{title}</p>
      <p className="mt-4 text-2xl md:text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default CardEstadoPostulacion;
