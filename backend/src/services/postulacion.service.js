import Postulacion from "../models/postulacion.model.js"
import EstadoPostulacion from "../models/estadoPostulacion.model.js"
import Oferta from "../models/oferta.model.js"
import Egresado from "../models/egresado.model.js"

export const crearPostulacionService = async (idegresado, idoferta) => {
    // Verificar que el egresado existe
    const egresado = await Egresado.findByPk(idegresado)
    if (!egresado) {
        throw { status: 404, message: "El egresado no existe" }
    }
    // Verificar que la oferta existe
    const oferta = await Oferta.findByPk(idoferta)
    if (!oferta) {
        throw { status: 404, message: "La oferta no existe" }
    }

    let postulacion
    try {
        postulacion = await Postulacion.create({
            idegresado,
            idoferta,
        })
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw { status: 400, message: "Ya te has postulado a esta oferta" }
        }
        throw error
    }

    // Crear estado inicial
    await EstadoPostulacion.create({
        idpostulacion: postulacion.idpostulacion,
        estado: "Enviada",
    })

    return postulacion
}