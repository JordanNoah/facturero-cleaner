import { DataTypes, Model } from "sequelize"
import {sequelize} from "../../sequelize";

interface EmisionPointRow {
    id: number,
    code: string,
    establishment_id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class EmisionPointSequelize extends Model<EmisionPointRow, Omit<EmisionPointRow, 'id'>> {
    declare id: number
    declare code: string
    declare establishment_id: number
    declare readonly createdAt: string
    declare readonly updatedAt: string
    declare readonly deletedAt: string
}

EmisionPointSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    establishment_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'emision_point',
    timestamps: true,
    paranoid: true
})