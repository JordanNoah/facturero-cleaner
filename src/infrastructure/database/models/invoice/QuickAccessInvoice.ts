import { Model, DataTypes, Sequelize } from "sequelize"
import { sequelize } from "../../sequelize"
import { InvoiceSequelize } from "./Invoice"
import { InvoiceDocumentSequelize } from "../invoiceDocuments"

interface QuickAccessInvoiceRow {
    id: number,
    uuid: string,
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
    numberInvoice: string,
    buyerBusinessName: string,
    buyerIdentification: string,
    totalAmount: number,
    invoiceId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class QuickAccessInvoiceSequelize extends Model<QuickAccessInvoiceRow,Omit<QuickAccessInvoiceRow, 'id'>> {
    declare id: number
    declare uuid: string
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
    declare numberInvoice: string
    declare buyerBusinessName: string
    declare buyerIdentification: string
    declare totalAmount: number
    declare invoiceId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

QuickAccessInvoiceSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    uuid:{
        type: DataTypes.STRING,
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
    numberInvoice:{
        type: DataTypes.STRING,
        allowNull:false
    },
    buyerBusinessName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    buyerIdentification:{
        type: DataTypes.STRING,
        allowNull:false
    },
    totalAmount:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    invoiceId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: InvoiceSequelize,
            key: 'id'
        }
    }
}, {
    sequelize, 
    modelName: 'quick_access_invoice',
    timestamps: true,
    underscored: true,
    paranoid: true
})

QuickAccessInvoiceSequelize.belongsTo(InvoiceSequelize, {
    foreignKey: 'invoiceId',
    as: 'invoice'
})

QuickAccessInvoiceSequelize.hasMany(InvoiceDocumentSequelize, {
    foreignKey: 'invoiceId',
    sourceKey: 'invoiceId',
    as: 'invoiceDocuments'
})