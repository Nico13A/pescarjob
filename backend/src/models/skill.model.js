import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const Skill = sequelize.define(
    "Skill",
    {
        idskill: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        tableName: "skill",
        timestamps: false,
    }
)

export default Skill
