import { Router } from "express";
import { crearOferta, obtenerOfertas, obtenerOfertaPorId, actualizarOferta, eliminarOferta, obtenerOfertasEmpresa } from "../controllers/oferta.controller.js";
import { validateOferta } from "../validations/ofertaValidation.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", obtenerOfertas);         
router.get("/:id", obtenerOfertaPorId); 

router.post("/", verificarToken, validateOferta, crearOferta);
router.put("/:id", verificarToken, validateOferta, actualizarOferta); 
router.delete("/:id", verificarToken, eliminarOferta);
router.get("/empresa/mis-ofertas", verificarToken, obtenerOfertasEmpresa); 

export default router;
