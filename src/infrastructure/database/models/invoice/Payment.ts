import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize";
import { InvoiceInfoSequelize } from "./InvoiceInfo";

interface PaymentRow {
    id: number,
    uuid: string,
    paymentMethod: number | null,
    total: string | null,
    term: number | null,
    timeUnit: string | null,
    invoiceInfoId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class PaymentSequelize extends Model<PaymentRow,Omit<PaymentRow,'id'>> {
    declare id: number
    declare uuid: string
    declare paymentMethod: number | null
    declare total: string | null
    declare term: number | null
    declare timeUnit: string | null
    declare invoiceInfoId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

PaymentSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    paymentMethod: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    total: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true
    },
    term: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    timeUnit: {
        type: DataTypes.STRING,
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
    modelName: 'Payment',
    timestamps: true,
    paranoid: true
})