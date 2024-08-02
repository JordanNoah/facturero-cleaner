import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize";
import { InvoiceInfoSequelize } from "./InvoiceInfo";

interface CompensationRow {
    id: number,
    uuid: string,
    code: number | null,
    rate: number | null,
    value: number | null,
    invoiceInfoId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class CompensationSequelize extends Model<CompensationRow,Omit<CompensationRow,'id'>> {
    declare id: number
    declare uuid: string
    declare code: number | null
    declare rate: number | null
    declare value: number | null
    declare invoiceInfoId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

CompensationSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    invoiceInfoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: InvoiceInfoSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    underscored: true,
    tableName: 'compensation',
    timestamps: true,
    paranoid: true
})