import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../sequelize";
import { FinancialInformationSequelize } from "./FinancialInformation";
import { InvoiceInfoSequelize } from "./InvoiceInfo";
import { DetailSequelize } from "./Detail";
import { ReimbursementSequelize } from "./Reimbursement";
import { FinancialInformationEntity } from "../../../../domain/entities/invoice/financialInformation.entity";
import { InvoiceInfoEntity } from "../../../../domain/entities/invoice/invoiceInfo.entity";
import DetailEntity from "../../../../domain/entities/invoice/detail.entity";
import ReimbursementEntity from "../../../../domain/entities/invoice/reimbursement.entity";
import WhitHoldingEntity from "../../../../domain/entities/invoice/withHolding.entity";
import { WithHoldingSequelize } from "./WithHolding";
import AdditionalDetailEntity from "../../../../domain/entities/invoice/additionalDetail.entity";
import { AdditionalDetailSequelize } from "./AdditionalDetail";
import { InvoiceAdditionalDetailEntity } from "../../../../domain/entities/invoice/invoiceAdditionalDetail.entity";
import { InvoiceAdditionalDetailSequelize } from "./InvoiceAdditionalDetail";
import { InstitutionSequelize } from "../institution/Institution";

interface InvoiceRow {
    id: number,
    uuid: string,
    institutionId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class InvoiceSequelize extends Model<InvoiceRow,Omit<InvoiceRow,'id'>> {
    declare id: number
    declare uuid: string
    declare institutionId: number
    declare financialInformation: FinancialInformationSequelize | FinancialInformationEntity | null
    declare invoiceInfo: InvoiceInfoSequelize | InvoiceInfoEntity | null
    declare details: DetailSequelize[] | DetailEntity[]
    declare reimbursements: ReimbursementSequelize[] | ReimbursementEntity[]
    declare withHoldings: WithHoldingSequelize[] | WhitHoldingEntity[]
    declare invoiceAdditionalDetails: InvoiceAdditionalDetailEntity[] | InvoiceAdditionalDetailSequelize[]
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
    },
    institutionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: InstitutionSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    underscored: true,
    tableName: 'invoice',
    timestamps: true,
    paranoid: true
})

InvoiceSequelize.hasOne(
    FinancialInformationSequelize,
    {
        sourceKey: 'id',
        foreignKey: 'invoiceId',
        as: 'financialInformation'
    }
)

InvoiceSequelize.hasOne(
    InvoiceInfoSequelize,
    {
        sourceKey: 'id',
        foreignKey: 'invoiceId',
        as: 'invoiceInfo'
    }
)

InvoiceSequelize.hasMany(
    DetailSequelize,
    {
        sourceKey: 'id',
        foreignKey: 'invoiceId',
        as: 'details'
    }
)

InvoiceSequelize.hasMany(
    ReimbursementSequelize,
    {
        sourceKey: 'id',
        foreignKey: 'invoiceId',
        as: 'reimbursements'
    }
)