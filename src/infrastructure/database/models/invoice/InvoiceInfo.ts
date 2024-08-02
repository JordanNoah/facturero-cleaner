import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../sequelize";
import { CompensationSequelize } from "./Compensation";
import CompensationEntity from "../../../../domain/entities/invoice/compensation.entity";
import { TotalWithTaxSequelize } from "./TotalWithTax";
import TotalWithTaxEntity from "../../../../domain/entities/invoice/totalWithTax.entity";
import PaymentEntity from "../../../../domain/entities/invoice/payment.entity";
import { PaymentSequelize } from "./Payment";

interface InvoiceInfoRow {
    id: number,
    uuid: string,
    issueDate: Date,
    establishmentAddress: string,
    specialTaxpayer: string,
    accountingObligation: string,
    foreignTrade: string,
    incoTermInvoice: string,
    incoTermLocation: string,
    countryOfOrigin: string,
    portOfShipment: string,
    portOfDestination: string,
    destinationCountry: string,
    acquisitionCountry: string,
    buyerIdentificationType: string,
    deliveryNote: string,
    buyerBusinessName: string,
    buyerIdentification: string,
    buyerAddress: string,
    totalWithoutTaxes: number,
    totalSubsidy: number,
    incoTermTotalWithoutTaxes: string,
    totalDiscount: number,
    reimbursementDocCode: number,
    totalReimbursementInvoices: number,
    totalReimbursementTaxableBase: number,
    totalReimbursementTax: number,
    tip: number,
    internationalFreight: number,
    internationalInsurance: number,
    customsExpenses: number,
    otherTransportExpenses: number,
    totalAmount: number,
    currency: string,
    plate: string,
    vatWithheldValue: number,
    incomeTaxWithheldValue: number,
    invoiceId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class InvoiceInfoSequelize extends Model<InvoiceInfoRow,Omit<InvoiceInfoRow,'id'>> {
    declare id: number
    declare uuid: string
    declare issueDate: Date
    declare establishmentAddress: string
    declare specialTaxpayer: string
    declare accountingObligation: string
    declare foreignTrade: string
    declare incoTermInvoice: string
    declare incoTermLocation: string
    declare countryOfOrigin: string
    declare portOfShipment: string
    declare portOfDestination: string
    declare destinationCountry: string
    declare acquisitionCountry: string
    declare buyerIdentificationType: string
    declare deliveryNote: string
    declare buyerBusinessName: string
    declare buyerIdentification: string
    declare buyerAddress: string
    declare totalWithoutTaxes: number
    declare totalSubsidy: number
    declare incoTermTotalWithoutTaxes: string
    declare totalDiscount: number
    declare reimbursementDocCode: number
    declare totalReimbursementInvoices: number
    declare totalReimbursementTaxableBase: number
    declare totalReimbursementTax: number
    declare tip: number
    declare internationalFreight: number
    declare internationalInsurance: number
    declare customsExpenses: number
    declare otherTransportExpenses: number
    declare totalAmount: number
    declare currency: string
    declare plate: string
    declare vatWithheldValue: number
    declare incomeTaxWithheldValue: number
    declare invoiceId: number
    declare compensations: CompensationSequelize[] | CompensationEntity[]
    declare totalWithTaxes: TotalWithTaxSequelize[] | TotalWithTaxEntity[]
    declare payments: PaymentSequelize[] | PaymentEntity[]
    declare readonly createdAt?: Date
    declare readonly updatedAt?: Date
    declare readonly deletedAt?: Date
}

InvoiceInfoSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },
    issueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    establishmentAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialTaxpayer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accountingObligation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foreignTrade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    incoTermInvoice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    incoTermLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryOfOrigin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    portOfShipment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    portOfDestination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destinationCountry: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acquisitionCountry: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyerIdentificationType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deliveryNote: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyerBusinessName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyerIdentification: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyerAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalWithoutTaxes: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    totalSubsidy: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    incoTermTotalWithoutTaxes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalDiscount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    reimbursementDocCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalReimbursementInvoices: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalReimbursementTaxableBase: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    totalReimbursementTax: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    tip: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    internationalFreight: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    internationalInsurance: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    customsExpenses: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    otherTransportExpenses: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vatWithheldValue: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    incomeTaxWithheldValue: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    underscored: true,
    tableName: 'invoice_info',
    timestamps: true,
    paranoid: true
})

InvoiceInfoSequelize.hasMany(
    TotalWithTaxSequelize,
    {
        sourceKey: 'id',
        foreignKey: 'invoiceInfoId',
        as: 'totalWithTaxes'
    }
)

InvoiceInfoSequelize.hasMany(
    CompensationSequelize,
    {
        sourceKey: 'id',
        foreignKey: 'invoiceInfoId',
        as: 'compensations'
    }
)

InvoiceInfoSequelize.hasMany(
    PaymentSequelize,
    {
        sourceKey: 'id',
        foreignKey: 'invoiceInfoId',
        as: 'payments'
    }
)