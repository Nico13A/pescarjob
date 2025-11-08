import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AutenticacionContext from "../contexts/AutenticacionContext";
import Cargando from "../components/Cargando/Cargando";

export const PublicRoute = () => {
  const { usuario, cargando } = useContext(AutenticacionContext);

  if (cargando) return <Cargando />;

  if (usuario) {
    if (usuario.rol === 'Empresa') return <Navigate to="/empresa" />;
    if (usuario.rol === 'Egresado') return <Navigate to="/egresado" />;
  }

  return <Outlet />;
};
