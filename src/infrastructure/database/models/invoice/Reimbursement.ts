import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../sequelize";
import TaxDetailEntity from "../../../../domain/entities/invoice/reimbursement/taxDetail.entity";
import { TaxDetailSequelize } from "./reimbursement/TaxDetail";
import { ReimbursementCompensationSequelize } from "./reimbursement/ReimbursementCompensation";
import ReimbursementCompensationEntity from "../../../../domain/entities/invoice/reimbursement/reimbursementCompensation.entity";

interface ReimbursementRow {
    id: number,
    uuid: string,
    reimbursementProviderIdentificationType: number,
    reimbursementProviderIdentification: string,
    reimbursementProviderCountryCode: number,
    reimbursementProviderType: number,
    reimbursementDocCode: string,
    reimbursementDocEstablishment: string,
    reimbursementDocEmissionPoint: string,
    reimbursementDocSequential: string,
    reimbursementDocIssueDate: Date,
    reimbursementDocAuthorizationNumber: string,
    invoiceId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class ReimbursementSequelize extends Model<ReimbursementRow,Omit<ReimbursementRow,'id'>> {
    declare id: number
    declare uuid: string
    declare reimbursementProviderIdentificationType: number
    declare reimbursementProviderIdentification: string
    declare reimbursementProviderCountryCode: number
    declare reimbursementProviderType: number
    declare reimbursementDocCode: string
    declare reimbursementDocEstablishment: string
    declare reimbursementDocEmissionPoint: string
    declare reimbursementDocSequential: string
    declare reimbursementDocIssueDate: Date
    declare reimbursementDocAuthorizationNumber: string
    declare invoiceId: number
    declare taxDetails: TaxDetailEntity[] | TaxDetailSequelize[]
    declare reimbursementCompensations: ReimbursementCompensationEntity[] | ReimbursementCompensationSequelize[]
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

ReimbursementSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    reimbursementProviderIdentificationType: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reimbursementProviderIdentification: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reimbursementProviderCountryCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reimbursementProviderType: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reimbursementDocCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reimbursementDocEstablishment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reimbursementDocEmissionPoint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reimbursementDocSequential: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reimbursementDocIssueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reimbursementDocAuthorizationNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    underscored: true,
    tableName: 'reimbursement',
    timestamps: true,
    paranoid: true
})