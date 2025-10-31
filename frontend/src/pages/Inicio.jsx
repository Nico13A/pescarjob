import React from "react";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="flex flex-col items-center">
      {/* HERO SECTION */}
      <section className="w-full bg-blue-50 py-20 text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Conecta tu{" "}
          <span className="text-blue-600">talento</span> con las mejores{" "}
          <span className="text-orange-500">oportunidades</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          PescarJob+ es la plataforma ideal que conecta egresados talentosos con
          empresas que buscan el mejor talento. Tu próximo empleo te está
          esperando.
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

      {/* FEATURES */}
      <section className="w-full max-w-6xl px-6 py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Todo lo que necesitas para encontrar trabajo
        </h2>
        <p className="text-gray-600 mb-10">
          Herramientas modernas y potentes para conectar talento con
          oportunidades
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 border">
            <div className="text-blue-600 text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-lg mb-2">Búsqueda Inteligente</h3>
            <p className="text-gray-600">
              Encontrá empleos que se ajusten a tu perfil con nuestro sistema de
              búsqueda avanzado y filtros inteligentes.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border">
            <div className="text-green-500 text-3xl mb-3">💬</div>
            <h3 className="font-semibold text-lg mb-2">Chat en tiempo real</h3>
            <p className="text-gray-600">
              Comunicate directamente con reclutadores y empresas a través de
              nuestro sistema de mensajería integrado.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border">
            <div className="text-yellow-500 text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-lg mb-2">Dashboard completo</h3>
            <p className="text-gray-600">
              Gestioná tus postulaciones, seguí tu progreso y obtené insights
              valiosos sobre tu búsqueda de empleo.
            </p>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 text-center">
          <div>
            <h3 className="text-3xl font-bold text-blue-600">1,200+</h3>
            <p className="text-gray-600">Egresados Registrados</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-600">250+</h3>
            <p className="text-gray-600">Empresas Activas</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-orange-500">800+</h3>
            <p className="text-gray-600">Empleos Publicados</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-red-500">92%</h3>
            <p className="text-gray-600">Tasa de Éxito</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
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
    </div>
  );
}
