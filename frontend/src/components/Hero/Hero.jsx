import InfoCard from "../InfoCard/InfoCard"

const Hero = ({ titulo, descripcion, stats = null, children }) => {
  return (
    <section className="pt-12">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-2xl md:text-4xl font-bold">{titulo}</h1>
          {children && <div className="mt-4 md:mt-0">{children}</div>}
        </div>

        <p className="text-gray-600 mb-10">{descripcion}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats && stats.map((stat, index) => (
            <InfoCard key={index} title={stat.title} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero



