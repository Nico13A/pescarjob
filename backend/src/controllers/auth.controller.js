import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendSuccess, sendError } from "../utils/response.js";
import { Usuario, Rol, Egresado, Empresa } from "../models/index.js"

export const register = async (req, res) => {
  const { usnombre, usapellido, usmail, uspass, ustelefono, rodescripcion } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ where: { usmail } });

    if (usuarioExistente) return sendError(res, "El email ya está registrado", 400);

    const rolExistente = await Rol.findOne({ where: { rodescripcion } });
    if (!rolExistente) return sendError(res, "Rol inválido", 400);

    const hashedPassword = await bcrypt.hash(uspass, 10);

    const usuario = await Usuario.create({
      usnombre,
      usapellido,
      usmail,
      uspass: hashedPassword,
      ustelefono,
      idrol: rolExistente.idrol,
    });

    // Crear perfil según rol
    if (rodescripcion === "Egresado") {
      await Egresado.create({ idusuario: usuario.idusuario });
    } else if (rodescripcion === "Empresa") {
      await Empresa.create({
        idusuario: usuario.idusuario,
        nombre_empresa: "",
        descripcion: "",
        ubicacion: "",
      });
    }

    return sendSuccess(res, { idusuario: usuario.idusuario }, "Usuario registrado con éxito", 201);
  } catch (error) {
    console.error(error);
    return sendError(res, "Error en el registro", 500);
  }
};

export const login = async (req, res) => {
  const { usmail, uspass } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: { usmail },
      include: [{ model: Rol, as: "Rol" }]
    });

    if (!usuario) return sendError(res, "Usuario no encontrado", 404);

    const validPass = await bcrypt.compare(uspass, usuario.uspass);
    if (!validPass) return sendError(res, "Contraseña incorrecta", 401);

    const token = jwt.sign(
      { id: usuario.idusuario, rol: usuario.Rol.rodescripcion },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return sendSuccess(
      res,
      {
        user: {
          idusuario: usuario.idusuario,
          usnombre: usuario.usnombre,
          usapellido: usuario.usapellido,
          usmail: usuario.usmail,
          rol: usuario.Rol.rodescripcion,
        }
      },
      "Login exitoso"
    );
  } catch (error) {
    console.error(error);
    return sendError(res, "Error en el login", 500);
  }
};

export const perfilUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: { idusuario: req.usuarioId }, 
      include: [{ model: Rol, as: "Rol" }]
    });

    if (!usuario) return sendError(res, "Usuario no encontrado", 404);

    return sendSuccess(res, {
      user: {
        idusuario: usuario.idusuario,
        usnombre: usuario.usnombre,
        usapellido: usuario.usapellido,
        usmail: usuario.usmail,
        rol: usuario.Rol.rodescripcion,
      }
    });
  } catch (error) {
    console.error(error);
    return sendError(res, "Error al obtener el perfil", 500);
  }
};