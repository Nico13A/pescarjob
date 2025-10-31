import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "../pages/Inicio";
import LayoutPublico from "../layout/LayoutPublico";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";

import Dashboard from "../pages/Egresado/Dashboard";
import Empleos from "../pages/Egresado/Empleos";
import Postulaciones from "../pages/Egresado/Postulaciones";
import Perfil from "../pages/Egresado/Perfil";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/*Página pública (antes del login) */}
        <Route
          path="/"
          element={
            <LayoutPublico>
              <Inicio />
            </LayoutPublico>
          }
        />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard-egresado" element={<Dashboard />} />
          <Route path="/empleos" element={<Empleos />} />
          <Route path="/postulaciones" element={<Postulaciones />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </BrowserRouter>
  );
};


