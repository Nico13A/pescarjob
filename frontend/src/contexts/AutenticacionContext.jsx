import { createContext, useState, useEffect } from "react";
import { login, logout, getPerfil } from "../services/auth";

// Crear el contexto
const AutenticacionContext = createContext();

// Crear el provider
const AutenticacionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Cargar usuario si hay sesión guardada
  useEffect(() => {
    const cargarUsuario = async () => {
      const tieneSesion = localStorage.getItem('hasSession') === 'true';
      if (!tieneSesion) {
        setCargando(false);
        return;
      }
      try {
        const res = await getPerfil();
        if (res.error) {
          setUsuario(null);
          localStorage.removeItem('hasSession');
        } else {
          setUsuario(res.data.user);
        }
      } catch {
        setUsuario(null);
        localStorage.removeItem('hasSession');
      } finally {
        setCargando(false);
      }
    };
    cargarUsuario();
  }, []);

  // Función para iniciar sesión
  const iniciarSesion = async (credenciales) => {
    try {
      const res = await login(credenciales);
      if (res.success) {
        setUsuario(res.data.user);
        localStorage.setItem('hasSession', 'true');
      }
      return res;
    } catch (err) {
      return { error: "Error de conexión" };
    }
  };

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    setCargando(true);
    try {
      const res = await logout();
      if (!res.error) {
        setUsuario(null);
        localStorage.removeItem('hasSession');
      }
      return res;
    } finally {
      setCargando(false);
    }
  };

  const data = {
    usuario,
    cargando,
    iniciarSesion,
    cerrarSesion
  };

  return (
    <AutenticacionContext.Provider value={data}>
      {children}
    </AutenticacionContext.Provider>
  );
};


export { AutenticacionProvider };
export default AutenticacionContext;

