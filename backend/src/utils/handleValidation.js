import { validationResult } from "express-validator";
import { sendError } from "./response.js";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, "Errores de validación", 400, errors.array());
  }
  next();
};