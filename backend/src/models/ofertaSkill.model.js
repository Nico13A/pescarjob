import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const OfertaSkill = sequelize.define(
    "OfertaSkill",
    {
        idoferta: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        idskill: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
    },
    {
        tableName: "oferta_skill",
        timestamps: false,
    }
)

export default OfertaSkill
