import { body } from "express-validator";
import { handleValidationErrors } from "../utils/handleValidation.js";

// Reglas de validación para la ruta de Registro 
export const validateRegister = [
  body("usnombre")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio").bail()
    .isLength({ min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres").bail(),

  body("usapellido")
    .trim()
    .notEmpty().withMessage("El apellido es obligatorio").bail()
    .isLength({ min: 2, max: 50 }).withMessage("El apellido debe tener entre 2 y 50 caracteres").bail(),

  body("usmail")
    .trim()
    .notEmpty().withMessage("El correo es obligatorio").bail()
    .isEmail().withMessage("El formato del correo es inválido").bail(),

  body("uspass")
    .notEmpty().withMessage("La contraseña es obligatoria").bail()
    .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres").bail()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/).withMessage("La contraseña debe contener al menos una letra y un número").bail(),
    
  body("ustelefono")
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric().withMessage("El teléfono solo debe contener números").bail()
    .isLength({ min: 8, max: 15 }).withMessage("El teléfono debe tener entre 8 y 15 dígitos").bail(),

  body("rodescripcion")
    .trim()
    .notEmpty().withMessage("El rol es obligatorio").bail()
    .isIn(["Egresado", "Empresa"]).withMessage("El rol debe ser Egresado o Empresa").bail(),

  handleValidationErrors
];

// Reglas de validación para la ruta de Login
export const validateLogin = [
  body("usmail")
    .trim()
    .notEmpty().withMessage("El correo es obligatorio").bail()
    .isEmail().withMessage("El formato del correo es inválido").bail(),

  body("uspass")
    .notEmpty().withMessage("La contraseña es obligatoria").bail(),

  handleValidationErrors
];
