import { Router } from "express"
import { verificarToken } from "../middlewares/auth.middleware.js"
import { verificarEgresado } from "../middlewares/verificarEgresado.js"
import { crearPostulacion, obtenerPostulacionesPorEgresado } from "../controllers/postulacion.controller.js"

const router = Router()

router.post('/', verificarToken, verificarEgresado, crearPostulacion)
router.get('/mis-postulaciones', verificarToken, verificarEgresado, obtenerPostulacionesPorEgresado)

export default router
