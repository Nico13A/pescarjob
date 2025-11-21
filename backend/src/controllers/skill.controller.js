import { Skill } from "../models/index.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const obtenerSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll({
            attributes: ["idskill", "nombre"]
        });
        return sendSuccess(res, skills, "Skills obtenidas correctamente");
    } catch (error) {
        console.error(error);
        return sendError(res, "Error al obtener skills", 500);
    }
};
