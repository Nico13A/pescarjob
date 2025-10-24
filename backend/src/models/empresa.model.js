import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Empresa = sequelize.define(
  "Empresa",
  {
    idempresa: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    idusuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    nombre_empresa: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ubicacion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "empresa",
    timestamps: true,
  }
);

export default Empresa;
