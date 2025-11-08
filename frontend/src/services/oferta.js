import { apiRequest } from "../utils/api";

// Crear una nueva oferta
export const crearOferta = (ofertaData) => apiRequest("post", "/ofertas", ofertaData);

// Obtener todas las ofertas
export const obtenerOfertas = () => apiRequest("get", "/ofertas");

// Obtener una oferta por ID
export const obtenerOfertaPorId = (id) => apiRequest("get", `/ofertas/${id}`);

// Actualizar una oferta
export const actualizarOferta = (id, ofertaData) => apiRequest("put", `/ofertas/${id}`, ofertaData);

// Eliminar una oferta
export const eliminarOferta = (id) => apiRequest("delete", `/ofertas/${id}`);
