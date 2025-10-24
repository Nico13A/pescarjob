import jwt from "jsonwebtoken";
import { sendError } from "../utils/response.js";

export const verificarToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return sendError(res, "No autenticado", 401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;  
    req.usuarioRol = decoded.rol; 
    next();
  } catch (err) {
    return sendError(res, "Token inválido", 401);
  }
};
