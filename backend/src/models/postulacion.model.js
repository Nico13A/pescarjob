import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const Postulacion = sequelize.define(
    "Postulacion",
    {
        idpostulacion: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        idegresado: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        idoferta: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        fecha_postulacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "postulacion",
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["idegresado", "idoferta"],
            },
        ],
    }
)

export default Postulacion
