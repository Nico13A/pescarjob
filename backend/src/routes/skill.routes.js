import { Router } from "express"
import { obtenerSkills } from "../controllers/skill.controller.js"

const router = Router()

router.get("/", obtenerSkills)

export default router
