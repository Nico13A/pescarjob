import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Oferta = sequelize.define("Oferta", {
  idoferta: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  idempresa: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  modalidad: {
    type: DataTypes.ENUM("remoto", "presencial", "hibrido"),
    defaultValue: "remoto",
  },
  ubicacion: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM("Activa", "Cerrada", "Suspendida"),
    defaultValue: "Activa",
  },
  salario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  jornada: {
    type: DataTypes.ENUM("Tiempo completo", "Medio tiempo"),
    defaultValue: "Tiempo completo",
    allowNull: false,
  },
}, {
  tableName: "oferta",
  timestamps: false,
});

export default Oferta;