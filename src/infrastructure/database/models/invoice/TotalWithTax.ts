import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize";

interface TotalWithTaxRow {
    id: number,
    uuid: string,
    code: number | null
    percentageCode: number | null
    additionalDiscount: number | null
    taxableBase: number | null
    rate: number | null
    value: number | null
    taxRefundValue: number | null
    invoiceInfoId: number
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class TotalWithTaxSequelize extends Model<TotalWithTaxRow,Omit<TotalWithTaxRow,'id'>> {
    declare id: number
    declare uuid: string
    declare code: number | null
    declare percentageCode: number | null
    declare additionalDiscount: number | null
    declare taxableBase: number | null
    declare rate: number | null
    declare value: number | null
    declare taxRefundValue: number | null
    declare invoiceInfoId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

TotalWithTaxSequelize.init({
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
        type: DataTypes.STRING,
        allowNull: false
    },
    percentageCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    additionalDiscount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taxableBase: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taxRefundValue: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoiceInfoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    underscored: true,
    tableName: 'total_with_tax',
    timestamps: true,
    paranoid: true
})