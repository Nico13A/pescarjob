import Egresado from "../models/egresado.model.js"
import { sendError } from "../utils/response.js"

export const verificarEgresado = async (req, res, next) => {
    const { usuarioRol, usuarioId } = req

    if (usuarioRol !== "Egresado") {
        return sendError(res, "Acceso permitido solo a egresados", 403)
    }

    try {
        const egresado = await Egresado.findOne({
            where: { idusuario: usuarioId }
        })

        if (!egresado) {
            return sendError(res, "El usuario no tiene un perfil de egresado", 404)
        }

        req.user = {
            usuarioId,
            usuarioRol,
            idegresado: egresado.idegresado,
        }

        next()
    } catch (error) {
        console.error(error)
        return sendError(res, "Error al verificar egresado", 500)
    }
}
