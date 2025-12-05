import { apiRequest } from "../utils/api"

// Crear una postulación
export const crearPostulacion = (data) => apiRequest("post", "/postulaciones", data)

export const obtenerPostulacionesEgresado = (params = {}) => apiRequest("get", "/postulaciones/mis-postulaciones", params)