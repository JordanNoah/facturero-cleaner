import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize"

interface WhitHoldingRow {
    id: number,
    uuid: string,
    code: number,
    percentageCode: number,
    rate: number,
    value: number,
    invoiceId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class WithHoldingSequelize extends Model<WhitHoldingRow,Omit<WhitHoldingRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare code: number
    declare percentageCode: number
    declare rate: number
    declare value: number
    declare invoiceId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

WithHoldingSequelize.init({
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
    percentageCode:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    rate:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    value:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    invoiceId:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    underscored: true,
    modelName: 'with_holding',
    timestamps: true,
    paranoid: true
})