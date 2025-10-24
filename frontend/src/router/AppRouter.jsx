import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
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


