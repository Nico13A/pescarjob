import CardEstadoPostulacion from "../CardEstadoPostulacion/CardEstadoPostulacion";

const Hero = () => {
  const stats = [
    { title: "Total de postulaciones", value: 120 },
    { title: "En proceso", value: 35 },
    { title: "Aceptadas", value: 80 },
    { title: "Tasa de éxito", value: "66%" },
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Ofertas de empleo</h1>
        <p className="text-gray-600 mb-10">
          Bienvenido, Egresado. Aquí puedes ver el estado de tus postulaciones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <CardEstadoPostulacion key={index} title={stat.title} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;


