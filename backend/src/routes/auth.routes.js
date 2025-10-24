import { Router } from "express";
import { sendSuccess } from "../utils/response.js";
import { register, login, perfilUsuario } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../middlewares/authValidation.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,  
    sameSite: "strict",
  });
  return sendSuccess(res, {}, "Logout exitoso");
});


router.get("/perfil", verificarToken, perfilUsuario);

export default router;
