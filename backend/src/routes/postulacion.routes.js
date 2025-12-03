import { Router } from "express"
import { verificarToken } from "../middlewares/auth.middleware"
import { verificarEgresado } from "../middlewares/verificarEgresado"
import { crearPostulacion } from "../controllers/postulacion.controller"

const router = Router()

router.post('/', verificarToken, verificarEgresado, crearPostulacion)

export default router