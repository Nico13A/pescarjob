import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    idusuario: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    usnombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    usapellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    usmail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    uspass: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ustelefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    idrol: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "usuario",
    timestamps: true,
  }
);

export default Usuario;