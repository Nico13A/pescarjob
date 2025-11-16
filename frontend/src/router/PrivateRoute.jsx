import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AutenticacionContext from "../contexts/AutenticacionContext";
import Cargando from "../components/Cargando/Cargando";

export const PrivateRoute = ({ rol }) => {
  const { usuario, cargando } = useContext(AutenticacionContext);

  if (cargando) return <Cargando />;

  if (!usuario) return <Navigate to="/login" />;

  if (rol && usuario.rol !== rol) {
    if (usuario.rol === "Egresado") return <Navigate to="/egresado" />;
    if (usuario.rol === "Empresa") return <Navigate to="/empresa" />;
    if (usuario.rol === "Admin") return <Navigate to="/admin" />;
  }

  return <Outlet />;
};


