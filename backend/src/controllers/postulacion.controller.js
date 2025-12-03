import { crearPostulacionService } from "../services/postulacion.service"
import { sendError, sendSuccess } from "../utils/response"


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
