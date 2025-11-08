import { Router } from "express";
import { crearOferta, obtenerOfertas, obtenerOfertaPorId, actualizarOferta, eliminarOferta } from "../controllers/oferta.controller.js";
import { validateOferta } from "../validations/ofertaValidation.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", obtenerOfertas);         
router.get("/:id", obtenerOfertaPorId); 

router.post("/", verificarToken, validateOferta, crearOferta);
router.put("/:id", verificarToken, validateOferta, actualizarOferta); 
router.delete("/:id", verificarToken, eliminarOferta);

export default router;
