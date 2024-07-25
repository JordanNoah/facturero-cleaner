import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../sequelize";

interface InvoiceRow {
    id: number,
    uuid: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class InvoiceSequelize extends Model<InvoiceRow,Omit<InvoiceRow,'id'>> {
    declare id: number
    declare uuid: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

InvoiceSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    }
},{
    sequelize,
    underscored: true,
    tableName: 'invoice',
    timestamps: true,
    paranoid: true
})