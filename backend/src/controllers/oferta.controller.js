import { sendSuccess, sendError } from "../utils/response.js";
import * as ofertaService from "../services/oferta.service.js";

// ===============================
// Crear nueva oferta
// ===============================
export const crearOferta = async (req, res) => {
  try {
    const data = await ofertaService.crearOfertaService(req);
    return sendSuccess(res, data.oferta, data.message, 201);
  } catch (error) {
    return sendError(res, error.message, error.status || 500);
  }
};


// ===============================
// Obtener todas las ofertas
// ===============================
export const obtenerOfertas = async (req, res) => {
  try {
    const data = await ofertaService.obtenerOfertasService();
    return sendSuccess(res, data.ofertas, data.message);
  } catch (error) {
    return sendError(res, error.message, error.status || 500);
  }
};


// ===============================
// Obtener oferta por ID
// ===============================
export const obtenerOfertaPorId = async (req, res) => {
  try {
    const data = await ofertaService.obtenerOfertaPorIdService(req.params.id);
    return sendSuccess(res, data.oferta, data.message);
  } catch (error) {
    return sendError(res, error.message, error.status || 500);
  }
};


// ===============================
// Actualizar una oferta
// ===============================
export const actualizarOferta = async (req, res) => {
  try {
    const data = await ofertaService.actualizarOfertaService(req);
    return sendSuccess(res, data.oferta, data.message);
  } catch (error) {
    return sendError(res, error.message, error.status || 500);
  }
};


// ===============================
// Eliminar una oferta
// ===============================
export const eliminarOferta = async (req, res) => {
  try {
    const data = await ofertaService.eliminarOfertaService(req);
    return sendSuccess(res, {}, data.message);
  } catch (error) {
    return sendError(res, error.message, error.status || 500);
  }
};


// ===============================
// Obtener ofertas de una empresa
// ===============================
export const obtenerOfertasEmpresa = async (req, res) => {
  try {
    const data = await ofertaService.obtenerOfertasEmpresaService(req.usuarioId);
    return sendSuccess(res, data.ofertas, data.message);
  } catch (error) {
    return sendError(res, error.message, error.status || 500);
  }
};