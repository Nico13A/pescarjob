import Postulacion from "../models/postulacion.model.js"
import EstadoPostulacion from "../models/estadoPostulacion.model.js"
import Oferta from "../models/oferta.model.js"
import Egresado from "../models/egresado.model.js"
import Empresa from "../models/empresa.model.js"

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

/*
export const obtenerPostulacionesPorEgresadoService = async (idegresado) => {
    try {
        const postulaciones = await Postulacion.findAll({
            where: { idegresado }
        })
        return postulaciones
    } catch (error) {
        console.error("Error al obtener postulaciones:", error)
        throw { status: 500, message: "Error al obtener las postulaciones" }
    }
}
*/
export const obtenerPostulacionesPorEgresadoService = async (idegresado) => {
    try {
        const postulaciones = await Postulacion.findAll({
            where: { idegresado },
            include: [
                {
                    model: Oferta,
                    as: "oferta",
                    include: [
                        {
                            model: Empresa,
                            attributes: ["idempresa", "nombre_empresa"]
                        }
                    ]
                },
                {
                    model: EstadoPostulacion,
                    as: "estados",
                    required: false,
                    order: [["idestado", "DESC"]],
                }
            ],
            order: [
                [{ model: EstadoPostulacion, as: "estados" }, "idestado", "DESC"]
            ]
        })

        return postulaciones

    } catch (error) {
        console.error(error)
        throw { status: 500, message: "Error al obtener las postulaciones" }
    }
}
