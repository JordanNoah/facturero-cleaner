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
    reimbursementDocCode: number,
    reimbursementDocEstablishment: number,
    reimbursementDocEmissionPoint: number,
    reimbursementDocSequential: number,
    reimbursementDocIssueDate: Date,
    reimbursementDocAuthorizationNumber: number,
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
    declare reimbursementDocCode: number
    declare reimbursementDocEstablishment: number
    declare reimbursementDocEmissionPoint: number
    declare reimbursementDocSequential: number
    declare reimbursementDocIssueDate: Date
    declare reimbursementDocAuthorizationNumber: number
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reimbursementDocEstablishment: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reimbursementDocEmissionPoint: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reimbursementDocSequential: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reimbursementDocIssueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reimbursementDocAuthorizationNumber: {
        type: DataTypes.INTEGER,
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