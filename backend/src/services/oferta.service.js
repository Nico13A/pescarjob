import { Oferta, Empresa, Skill } from "../models/index.js";


export const crearOfertaService = async (req) => {
    const { usuarioId, usuarioRol } = req;
    const { titulo, descripcion, modalidad, ubicacion, fecha_fin, salario, jornada, skills } = req.body;

    if (usuarioRol !== "Empresa") {
        throw { message: "Solo las empresas pueden crear ofertas", status: 403 };
    }

    const empresa = await Empresa.findOne({ where: { idusuario: usuarioId } });

    if (!empresa) {
        throw { message: "No se encontró la empresa asociada al usuario", status: 404 };
    }

    if (fecha_fin) {
        const hoy = new Date();
        const fechaFinOferta = new Date(fecha_fin);
        hoy.setHours(0, 0, 0, 0);
        fechaFinOferta.setHours(0, 0, 0, 0);
        if (fechaFinOferta < hoy) throw {message: "La fecha de finalización no puede ser anterior a hoy.", status: 400};
    }

    const nuevaOferta = await Oferta.create({
        idempresa: empresa.idempresa,
        titulo,
        descripcion,
        modalidad,
        ubicacion,
        fecha_fin,
        salario,
        jornada
    });

    if (skills && Array.isArray(skills)) await nuevaOferta.setSkills(skills);

    return {
        oferta: nuevaOferta,
        message: "Oferta creada con éxito"
    };
};


export const obtenerOfertasService = async () => {
    const ofertas = await Oferta.findAll({
        include: [
            {
                model: Empresa,
                attributes: ["idempresa", "nombre_empresa", "ubicacion"],
            },
            {
                model: Skill,
                attributes: ["idskill", "nombre"],
            },
        ],
        order: [["fecha_inicio", "DESC"]],
    });

    return {
        ofertas,
        message: "Listado de ofertas obtenido correctamente",
    };
};


export const obtenerOfertaPorIdService = async (id) => {
    const oferta = await Oferta.findByPk(id, {
        include: [
            {
                model: Empresa,
                attributes: ["idempresa", "nombre_empresa", "ubicacion"],
            },
            {
                model: Skill,
                attributes: ["idskill", "nombre"],
            },
        ],
    });

    if (!oferta) {
        throw { message: "Oferta no encontrada", status: 404 };
    }

    return {
        oferta,
        message: "Oferta encontrada correctamente",
    };
};


export const actualizarOfertaService = async (req) => {
    const { id } = req.params;
    const { usuarioId, usuarioRol } = req;
    const { titulo, descripcion, modalidad, ubicacion, fecha_fin, estado, salario, jornada, skills } = req.body;

    if (usuarioRol !== "Empresa") {
        throw { message: "Solo las empresas pueden actualizar ofertas", status: 403 };
    }

    const empresa = await Empresa.findOne({ where: { idusuario: usuarioId } });
    if (!empresa) {
        throw { message: "No se encontró la empresa asociada al usuario", status: 404 };
    }

    const oferta = await Oferta.findOne({
        where: { idoferta: id, idempresa: empresa.idempresa },
    });

    if (!oferta) {
        throw { message: "Oferta no encontrada o no pertenece a esta empresa", status: 404 };
    }

    await oferta.update({
        titulo,
        descripcion,
        modalidad,
        ubicacion,
        fecha_fin,
        estado,
        salario,
        jornada,
    });

    if (skills && Array.isArray(skills)) {
        await oferta.setSkills(skills);
    }

    return {
        oferta,
        message: "Oferta actualizada correctamente",
    };
};


export const eliminarOfertaService = async (req) => {
    const { id } = req.params;
    const { usuarioId, usuarioRol } = req;

    if (usuarioRol !== "Empresa") {
        throw { message: "Solo las empresas pueden eliminar ofertas", status: 403 };
    }

    const empresa = await Empresa.findOne({ where: { idusuario: usuarioId } });

    if (!empresa) {
        throw { message: "No se encontró la empresa asociada al usuario", status: 404 };
    }

    const oferta = await Oferta.findOne({
        where: { idoferta: id, idempresa: empresa.idempresa },
    });

    if (!oferta) {
        throw { message: "Oferta no encontrada o no pertenece a esta empresa", status: 404 };
    }

    await oferta.destroy();

    return {
        message: "Oferta eliminada correctamente",
    };
};


export const obtenerOfertasEmpresaService = async (usuarioId) => {
    const empresa = await Empresa.findOne({ where: { idusuario: usuarioId } });
    if (!empresa) throw { message: "No se encontró la empresa asociada al usuario", status: 404 };

    const ofertas = await Oferta.findAll({
        where: { idempresa: empresa.idempresa },
        include: [
            {
                model: Empresa,
                attributes: ["idempresa", "nombre_empresa", "ubicacion"],
            },
            {
                model: Skill,
                attributes: ["idskill", "nombre"],
            },
        ],
        order: [["fecha_inicio", "DESC"]],
    });

    return {
        ofertas,
        message: "Listado de ofertas de la empresa obtenido correctamente",
    };
};