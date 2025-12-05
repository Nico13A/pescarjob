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
        
        let { estado = null, limit = 9, page = 1 } = req.query
       
        limit = Number(limit)
        page = Number(page)
        const offset = (page - 1) * limit
        
        const resultado = await obtenerPostulacionesPorEgresadoService(idegresado, estado, limit, offset)
        
        return sendSuccess(res, resultado)
    } catch (error) {
        return sendError(res, error.message, error.status || 500)
    }
}
