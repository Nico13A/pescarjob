import { Link } from "react-router-dom";

export default function SeccionHero() {
  return (
    <section className="w-full bg-blue-50 py-20 text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
        Conecta tu <span className="text-blue-600">talento</span> con las <br />
        mejores <span className="text-orange-500">oportunidades</span>
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        PescarJob+ es la plataforma ideal que conecta egresados talentosos con
        empresas que buscan el mejor talento. Tu próximo empleo te está esperando.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Empezar Gratis
        </Link>
        <Link
          to="/empleos"
          className="border border-gray-300 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
        >
          Ver empleos
        </Link>
      </div>
    </section>
  );
}
