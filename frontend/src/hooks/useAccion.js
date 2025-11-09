import { useState } from "react";

export const useAccion = (accionFn) => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [erroresCampos, setErroresCampos] = useState(null);

  const ejecutar = async (datos) => {
    setCargando(true);
    setError(null);
    setErroresCampos(null);

    try {
      const res = await accionFn(datos);
      if (res.fieldErrors) setErroresCampos(res.fieldErrors);
      if (res.error) setError(res.error);
      return res;
    } catch (err) {
      setError("Error inesperado al ejecutar la acción");
      console.error(err);
      return { error: "Error inesperado" };
    } finally {
      setCargando(false);
    }
  };

  const limpiarErrores = () => {
    setError(null);
    setErroresCampos(null);
  };

  return { ejecutar, cargando, error, erroresCampos, limpiarErrores };
};