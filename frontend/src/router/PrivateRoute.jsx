import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Cargando from "../components/Cargando/Cargando";

export const PrivateRoute = () => {
  const { usuario, cargando } = useAuthContext();

  if (cargando) return <Cargando />;

  return usuario ? <Outlet /> : <Navigate to="/login" />;
};

