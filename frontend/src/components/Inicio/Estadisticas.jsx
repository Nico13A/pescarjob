export default function Estadisticas() {
  const stats = [
    { value: "1,200+", label: "Egresados Registrados", color: "text-blue-600" },
    { value: "250+", label: "Empresas Activas", color: "text-green-600" },
    { value: "800+", label: "Empleos Publicados", color: "text-orange-500" },
    { value: "92%", label: "Tasa de Éxito", color: "text-red-500" },
  ];

  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-20 text-center">
        {stats.map((stat, i) => (
          <div key={i}>
            <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
