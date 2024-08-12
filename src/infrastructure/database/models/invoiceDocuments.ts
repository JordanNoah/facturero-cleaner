import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { InvoiceSequelize } from "./invoice/Invoice";

interface InvoiceDocumentRow {
    id: number,
    type: string,
    url: string,
    invoiceId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class InvoiceDocumentSequelize extends Model<InvoiceDocumentRow,Omit<InvoiceDocumentRow,'id'>> {
    declare id: number
    declare type: string
    declare url: string
    declare invoiceId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

InvoiceDocumentSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: InvoiceSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    underscored: true,
    tableName: 'invoice_document',
    timestamps: true,
    paranoid: true
})