import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../../sequelize"

interface TaxDetailRow {
    id: number,
    uuid: string,
    code: number,
    percentageCode: number,
    rate: number,
    reimbursementTaxableBase: number,
    reimbursementTax: string,
    reimbursementId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class TaxDetailSequelize extends Model<TaxDetailRow,Omit<TaxDetailRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare code: number
    declare percentageCode: number
    declare rate: number
    declare reimbursementTaxableBase: number
    declare reimbursementTax: string
    declare reimbursementId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

TaxDetailSequelize.init({
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
    reimbursementTaxableBase:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    reimbursementTax:{
        type: DataTypes.DECIMAL(10,4),
        allowNull:false
    },
    reimbursementId:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    underscored: true,
    modelName: 'tax_detail',
    timestamps: true,
    paranoid: true
})