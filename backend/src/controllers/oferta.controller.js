import { Oferta, Empresa } from "../models/index.js";
import { sendSuccess, sendError } from "../utils/response.js";

// ===============================
// Crear nueva oferta
// ===============================
export const crearOferta = async (req, res) => {
  try {
    const idusuario = req.usuarioId;
    const { titulo, descripcion, modalidad, ubicacion, fecha_fin } = req.body;

    const empresa = await Empresa.findOne({ where: { idusuario } });
    if (!empresa) {
      return sendError(res, "Solo las empresas pueden crear ofertas", 403);
    }

    const nuevaOferta = await Oferta.create({
      idempresa: empresa.idempresa,
      titulo,
      descripcion,
      modalidad,
      ubicacion,
      fecha_fin,
    });
    return sendSuccess(res, nuevaOferta, "Oferta creada con éxito", 201);
  } catch (error) {
    console.error(error);
    return sendError(res, "Error al crear la oferta", 500);
  }
};


// ===============================
// Obtener todas las ofertas
// ===============================
export const obtenerOfertas = async (req, res) => {
  try {
    const ofertas = await Oferta.findAll({
      include: [
        {
          model: Empresa,
          attributes: ["idempresa", "nombre_empresa", "ubicacion"],
        },
      ],
      order: [["fecha_inicio", "DESC"]],
    });
    return sendSuccess(res, ofertas, "Listado de ofertas obtenido correctamente");
  } catch (error) {
    console.error(error);
    return sendError(res, "Error al obtener las ofertas", 500);
  }
};


// ===============================
// Obtener oferta por ID
// ===============================
export const obtenerOfertaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const oferta = await Oferta.findByPk(id, {
      include: [
        {
          model: Empresa,
          attributes: ["idempresa", "nombre_empresa", "ubicacion"],
        },
      ],
    });

    if (!oferta) {
      return sendError(res, "Oferta no encontrada", 404);
    }

    return sendSuccess(res, oferta, "Oferta encontrada correctamente");
  } catch (error) {
    console.error(error);
    return sendError(res, "Error al buscar la oferta", 500);
  }
};


// ===============================
// Actualizar una oferta
// ===============================
export const actualizarOferta = async (req, res) => {
  try {
    const { id } = req.params;
    const idusuario = req.usuarioId;
    const { titulo, descripcion, modalidad, ubicacion, fecha_fin, estado } = req.body;

    const empresa = await Empresa.findOne({ where: { idusuario } });
    if (!empresa) {
      return sendError(res, "Solo las empresas pueden actualizar ofertas", 403);
    }

    const oferta = await Oferta.findOne({
      where: { idoferta: id, idempresa: empresa.idempresa },
    });

    if (!oferta) {
      return sendError(res, "Oferta no encontrada o no pertenece a esta empresa", 404);
    }

    await oferta.update({
      titulo,
      descripcion,
      modalidad,
      ubicacion,
      fecha_fin,
      estado,
    });

    return sendSuccess(res, oferta, "Oferta actualizada correctamente");
  } catch (error) {
    console.error(error);
    return sendError(res, "Error al actualizar la oferta", 500);
  }
};


// ===============================
// Eliminar una oferta
// ===============================
export const eliminarOferta = async (req, res) => {
  try {
    const { id } = req.params;
    const idusuario = req.usuarioId;

    const empresa = await Empresa.findOne({ where: { idusuario } });
    if (!empresa) {
      return sendError(res, "Solo las empresas pueden eliminar ofertas", 403);
    }

    const oferta = await Oferta.findOne({
      where: { idoferta: id, idempresa: empresa.idempresa },
    });

    if (!oferta) {
      return sendError(res, "Oferta no encontrada o no pertenece a esta empresa", 404);
    }

    await oferta.destroy();
    return sendSuccess(res, {}, "Oferta eliminada correctamente");
  } catch (error) {
    console.error(error);
    return sendError(res, "Error al eliminar la oferta", 500);
  }
};