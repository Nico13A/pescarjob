import EgresadoLayout from "./EgresadoLayout";
import Hero from "../../components/Hero/Hero";
import MiPostulaciones from "../../components/MiPostulaciones/MiPostulaciones";

const Dashboard = () => {
  return (
    <EgresadoLayout>
      <Hero />
      <MiPostulaciones />
    </EgresadoLayout>
  );
};

export default Dashboard;
