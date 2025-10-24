import { createContext, useState, useContext, useEffect } from "react";
import { login, logout, getPerfil } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

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

  const iniciarSesion = async (credenciales) => {
    setCargando(true);
    try {
      const res = await login(credenciales);
      if (res.success) {
        setUsuario(res.data.user);
        localStorage.setItem('hasSession', 'true'); 
      }
      return res;
    } finally {
      setCargando(false);
    }
  };

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

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        iniciarSesion,
        cerrarSesion
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
