import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../sequelize"

interface ReimbursementCompensationRow {
    id: number,
    uuid: string,
    code: number,
    rate: string,
    value: string,
    reimbursement_id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class ReimbursementCompensationSequelize extends Model<ReimbursementCompensationRow,Omit<ReimbursementCompensationRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare code: number
    declare rate: string
    declare value: string
    declare reimbursement_id: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

ReimbursementCompensationSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false
    },
    code:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    rate:{
        type: DataTypes.DECIMAL(10,4),
        allowNull:false
    },
    value:{
        type: DataTypes.DECIMAL(10,4),
        allowNull:false
    },
    reimbursement_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    underscored: true,
    modelName: 'reimbursement_compensation',
    timestamps: true,
    paranoid: true
})