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


export const obtenerPostulacionesPorEgresadoService = async (idegresado, estado = null, limit = 9, offset = 0) => {
    try {
        const includeEstados = {
            model: EstadoPostulacion,
            as: "estados",
            required: false,
            order: [["fecha_inicio", "DESC"]]
        }

        if (estado !== null) {
            includeEstados.where = { estado }
            includeEstados.required = true
        }

        const orden = estado === null
            ? [["fecha_ultimo_estado", "DESC"], ["fecha_postulacion", "DESC"]]
            : [["fecha_postulacion", "DESC"]]

        const { rows, count } = await Postulacion.findAndCountAll({
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
                includeEstados
            ],
            limit,
            offset,
            distinct: true,
            order: orden
        })

        rows.forEach(p => {
            if (p.estados && p.estados.length > 0) {
                p.estados.sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio))
            }
        })

        return {
            postulaciones: rows,
            total: count
        }
    } catch (error) {
        console.error(error)
        throw { status: 500, message: "Error al obtener las postulaciones" }
    }
}
