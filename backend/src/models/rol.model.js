import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Rol = sequelize.define(
  "Rol",
  {
    idrol: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    rodescripcion: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "rol",
    timestamps: false, 
  }
);

export default Rol;
