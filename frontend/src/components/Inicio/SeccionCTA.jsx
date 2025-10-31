import { Link } from "react-router-dom";

export default function SeccionCTA() {
  return (
    <section className="text-center py-20 px-6">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        ¿Listo para encontrar tu próximo empleo?
      </h2>
      <p className="text-gray-600 mb-8">
        Únete a miles de egresados que ya encontraron su trabajo ideal.
      </p>
      <Link
        to="/register"
        className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition"
      >
        Crear Cuenta Gratuita
      </Link>
    </section>
  );
}
