import EgresadoLayout from "../../layout/EgresadoLayout";
import Hero from "../../components/Hero/Hero";
import MiPostulaciones from "../../components/MiPostulaciones/MiPostulaciones";

const Dashboard = () => {
  const stats = [
    { title: "Total de postulaciones", value: 120 },
    { title: "En proceso", value: 35 },
    { title: "Aceptadas", value: 80 },
    { title: "Tasa de éxito", value: "66%" },
  ]
  return (
    <EgresadoLayout>
      <Hero
        titulo='Ofertas de empleo'
        descripcion='Bienvenido, Egresado. Aquí puedes ver el estado de tus postulaciones.'
        stats={stats}
      />
      <MiPostulaciones />
    </EgresadoLayout>
  );
};

export default Dashboard;
