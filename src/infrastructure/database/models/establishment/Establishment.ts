import { DataTypes, Model } from "sequelize"
import {sequelize} from "../../sequelize";
import EmisionPointEntity from "../../../../domain/entities/emisionPoint/emisionPoint.entity";
import { EmisionPointSequelize } from "../emisionPoint/EmisionPoint";

interface EstablishmentRow {
    id: number,
    uuid: string,
    name: string,
    code: string,
    address: string | null,
    institution_id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class EstablishmentSequelize extends Model<EstablishmentRow, Omit<EstablishmentRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare name: string
    declare code: string
    declare address: string | null
    declare institution_id: number
    declare readonly createdAt: string
    declare readonly updatedAt: string
    declare readonly deletedAt: string
    declare emisionPoints: EmisionPointEntity[] | EmisionPointSequelize[]
}

EstablishmentSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    institution_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'establishment',
    timestamps: true,
    underscored: true,
    paranoid: true
})