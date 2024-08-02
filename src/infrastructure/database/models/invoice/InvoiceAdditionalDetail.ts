import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../sequelize";

interface InvoiceAdditionalDetailRow {
    id: number,
    uuid: string,
    name: string,
    value: string,
    invoice_id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class InvoiceAdditionalDetailSequelize extends Model<InvoiceAdditionalDetailRow,Omit<InvoiceAdditionalDetailRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare name: string
    declare value: string
    declare invoice_id: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

InvoiceAdditionalDetailSequelize.init({
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
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    value:{
        type: DataTypes.STRING,
        allowNull:false
    },
    invoice_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    underscored: true,
    modelName: 'invoice_additional_detail',
    timestamps: true,
    paranoid: true
})