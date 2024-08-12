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
    totalWithoutTaxes: string,
    totalSubsidy: string,
    incoTermTotalWithoutTaxes: string,
    totalDiscount: string,
    reimbursementDocCode: string,
    totalReimbursementInvoices: string,
    totalReimbursementTaxableBase: string,
    totalReimbursementTax: string,
    tip: string,
    internationalFreight: string,
    internationalInsurance: string,
    customsExpenses: string,
    otherTransportExpenses: string,
    totalAmount: string,
    currency: string,
    plate: string,
    vatWithheldValue: string,
    incomeTaxWithheldValue: string,
    totalTaxesCodeCero: string,
    totalTaxesCodeTwo: string,
    totalTaxesCodeThree: string,
    totalTaxesCodeFour: string,
    totalTaxesCodeFive: string,
    totalTaxesCodeSix: string,
    totalTaxesCodeSeven: string,
    totalTaxesCodeEight: string,
    totalTaxesCodeTen: string,
    totalIce: string,
    totalIrbpnr: string,
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
    declare totalWithoutTaxes: string
    declare totalSubsidy: string
    declare incoTermTotalWithoutTaxes: string
    declare totalDiscount: string
    declare reimbursementDocCode: string
    declare totalReimbursementInvoices: string
    declare totalReimbursementTaxableBase: string
    declare totalReimbursementTax: string
    declare tip: string
    declare internationalFreight: string
    declare internationalInsurance: string
    declare customsExpenses: string
    declare otherTransportExpenses: string
    declare totalAmount: string
    declare currency: string
    declare plate: string
    declare vatWithheldValue: string
    declare incomeTaxWithheldValue: string
    declare totalTaxesCodeCero: string
    declare totalTaxesCodeTwo: string
    declare totalTaxesCodeThree: string
    declare totalTaxesCodeFour: string
    declare totalTaxesCodeFive: string
    declare totalTaxesCodeSix: string
    declare totalTaxesCodeSeven: string
    declare totalTaxesCodeEight: string
    declare totalTaxesCodeTen: string
    declare totalIce: string
    declare totalIrbpnr: string
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
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    totalSubsidy: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    incoTermTotalWithoutTaxes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalDiscount: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    reimbursementDocCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalReimbursementInvoices: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    totalReimbursementTaxableBase: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    totalReimbursementTax: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    tip: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    internationalFreight: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    internationalInsurance: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    customsExpenses: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    otherTransportExpenses: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10,4),
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
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    incomeTaxWithheldValue: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: false
    },
    totalTaxesCodeCero: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true,
        defaultValue: 0
    },
    totalTaxesCodeTwo: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true,
        defaultValue: 0
    },
    totalTaxesCodeThree: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true,
        defaultValue: 0
    },
    totalTaxesCodeFour: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true,
        defaultValue: 0
    },
    totalTaxesCodeFive: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true,
        defaultValue: 0
    },
    totalTaxesCodeSix: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true,
        defaultValue: 0
    },
    totalTaxesCodeSeven: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true,
        defaultValue: 0
    },
    totalTaxesCodeEight: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true,
        defaultValue: 0
    },
    totalTaxesCodeTen: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true,
        defaultValue: 0
    },
    totalIce: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true,
        defaultValue: 0
    },
    totalIrbpnr: {
        type: DataTypes.DECIMAL(10,4),
        allowNull: true,
        defaultValue: 0
    },
    invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
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