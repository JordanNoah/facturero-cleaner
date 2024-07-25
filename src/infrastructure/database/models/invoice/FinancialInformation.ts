import { DataTypes, Model, Sequelize } from "sequelize"
import {sequelize} from "../../sequelize";

interface FinancialInformationRow {
    id: number,
    environment: number,
    issueType: number,
    businessName: string,
    tradeName: string,
    taxId: string,
    accessKey: string,
    docCode: string,
    establishment: string,
    emissionPoint: string,
    sequential: string,
    headquartersAddress: string,
    withholdingAgent: string,
    rimpeTaxpayer: string,
    invoiceId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class FinancialInformationSequelize extends Model<FinancialInformationRow,Omit<FinancialInformationRow, 'id'>> {
    declare id: number
    declare environment: number
    declare issueType: number
    declare businessName: string
    declare tradeName: string
    declare taxId: string
    declare accessKey: string
    declare docCode: string
    declare establishment: string
    declare emissionPoint: string
    declare sequential: string
    declare headquartersAddress: string
    declare withholdingAgent: string
    declare rimpeTaxpayer: string
    declare invoiceId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

FinancialInformationSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    environment:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    issueType:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    businessName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    tradeName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    taxId:{
        type: DataTypes.STRING,
        allowNull:false
    },
    accessKey:{
        type: DataTypes.STRING,
        allowNull:false
    },
    docCode:{
        type: DataTypes.STRING,
        allowNull:false
    },
    establishment:{
        type: DataTypes.STRING,
        allowNull:false
    },
    emissionPoint:{
        type: DataTypes.STRING,
        allowNull:false
    },
    sequential:{
        type: DataTypes.STRING,
        allowNull:false
    },
    headquartersAddress:{
        type: DataTypes.STRING,
        allowNull:false
    },
    withholdingAgent:{
        type: DataTypes.STRING,
        allowNull:false
    },
    rimpeTaxpayer:{
        type: DataTypes.STRING,
        allowNull:false
    },
    invoiceId:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    underscored:true,
    tableName: "financial_information",
    timestamps: true,
    paranoid: true
})