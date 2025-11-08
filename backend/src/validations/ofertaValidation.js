import { body } from "express-validator";
import { handleValidationErrors } from "../utils/handleValidation.js";

export const validateOferta = [
  body("titulo")
    .trim()
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ max: 150 }).withMessage("El título no debe superar los 150 caracteres"),

  body("descripcion")
    .trim()
    .notEmpty().withMessage("La descripción es obligatoria"),

  body("modalidad")
    .optional()
    .isIn(["remoto", "presencial", "hibrido"]).withMessage("Modalidad inválida"),

  body("fecha_fin")
    .optional()
    .isISO8601().withMessage("Formato de fecha inválido"),

  handleValidationErrors,
];
