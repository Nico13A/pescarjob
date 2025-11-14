import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "../pages/Inicio";
import LayoutPublico from "../layout/LayoutPublico";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import Dashboard from "../pages/Egresado/Dashboard";
import Empleos from "../pages/Egresado/Empleos";
import Postulaciones from "../pages/Egresado/Postulaciones";
import Perfil from "../pages/Egresado/Perfil";

import DashboardEmpresa from "../pages/Empresa/DashboardEmpresa";
import FormularioOferta from "../pages/Empresa/FormularioOferta";

import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

export const AppRouter = () => {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Routes>

        {/* Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route
            path="/"
            element={
              <LayoutPublico>
                <Inicio />
              </LayoutPublico>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas privadas - Egresado */}
        <Route element={<PrivateRoute rol="Egresado" />}>
          <Route path="/egresado" element={<Dashboard />} />
          <Route path="/egresado/empleos" element={<Empleos />} />
          <Route path="/egresado/postulaciones" element={<Postulaciones />} />
          <Route path="/egresado/perfil" element={<Perfil />} />
        </Route>

        {/* Rutas privadas - Empresa */}
        <Route element={<PrivateRoute rol="Empresa" />}>
          <Route path="/empresa" element={<DashboardEmpresa />} />
          <Route path="/empresa/crear-oferta" element={<FormularioOferta />} />
          <Route path="/empresa/editar-oferta/:id" element={<FormularioOferta />} />
          <Route path="/empresa/perfil" element={<Perfil />} />
          <Route path="/empresa/ofertas" element={<Perfil />} />
          <Route path="/empresa/postulaciones" element={<Perfil />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </BrowserRouter>
  );
};
