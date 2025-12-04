import { crearPostulacionService, obtenerPostulacionesPorEgresadoService } from "../services/postulacion.service.js"
import { sendError, sendSuccess } from "../utils/response.js"


export const crearPostulacion = async (req, res) => {
    try {
        const { idoferta } = req.body
        const idegresado = req.usuarioId
        const postulacion = await crearPostulacionService(idegresado, idoferta)
        return sendSuccess(res, postulacion, "Postulación enviada correctamente", 201)
    } catch (error) {
        return sendError(res, error.message, error.status || 500)
    }
}


export const obtenerPostulacionesPorEgresado = async (req, res) => {
    try {
        const idegresado = req.usuarioId
        const postulaciones = await obtenerPostulacionesPorEgresadoService(idegresado)
        return sendSuccess(res, postulaciones)
    } catch (error) {
        return sendError(res, error.message, error.status || 500)
    }
}
