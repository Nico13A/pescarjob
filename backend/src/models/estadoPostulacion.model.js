import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const EstadoPostulacion = sequelize.define(
    "EstadoPostulacion",
    {
        idestado: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        idpostulacion: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM(
                "Enviada",
                "En revisión",
                "Preseleccionado",
                "Contratado",
                "Rechazada",
                "Cancelada"
            ),
            allowNull: false,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "estado_postulacion",
        timestamps: false,
    }
)

export default EstadoPostulacion
