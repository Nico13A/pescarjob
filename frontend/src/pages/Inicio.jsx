import React from "react";
import SeccionHero from "../components/Inicio/SeccionHero";
import CardFeature from "../components/Inicio/CardFeature";
import Estadisticas from "../components/Inicio/Estadisticas";
import SeccionCTA from "../components/Inicio/SeccionCTA";
import { featuresData } from "../data/featuresData"; // 

export default function Inicio() {
  return (
    <div className="flex flex-col items-center">
      <SeccionHero />

      <section className="w-full max-w-6xl px-6 py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Todo lo que necesitas para encontrar trabajo
        </h2>
        <p className="text-gray-600 mb-10">
          Herramientas modernas y potentes para conectar talento con oportunidades
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuresData.map((feature, i) => (
            <CardFeature key={i} {...feature} />
          ))}
        </div>
      </section>

      <Estadisticas />
      <SeccionCTA />
    </div>
  );
}
