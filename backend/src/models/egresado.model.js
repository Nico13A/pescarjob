import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Egresado = sequelize.define(
  "Egresado",
  {
    idegresado: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    idusuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    curso: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    estado_laboral: {
      type: DataTypes.ENUM("buscando", "trabajando", "freelance"),
      defaultValue: "buscando",
    },
  },
  {
    tableName: "egresado",
    timestamps: true,
  }
);

export default Egresado;
