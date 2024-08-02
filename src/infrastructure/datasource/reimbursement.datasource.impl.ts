import { where } from "sequelize";
import { ReimbursementDatasource } from "../../domain/datasource/reimbursement.datasource";
import ReimbursementDto from "../../domain/dtos/invoice/reimbursement.dto";
import ReimbursementEntity from "../../domain/entities/invoice/reimbursement.entity";
import { v4 } from "uuid"
import { ReimbursementSequelize } from "../database/models/invoice/Reimbursement";
import TaxDetailEntity from "../../domain/entities/invoice/reimbursement/taxDetail.entity";
import TaxDetailDatasourceImpl from "./reimbursement/taxDetail.datasource.impl";
import ReimbursementCompensationEntity from "../../domain/entities/invoice/reimbursement/reimbursementCompensation.entity";
import { ReimbursementCompensationDatasourceImpl } from "./reimbursement/reimbursementCompensation.datasource.impl";

export class ReimbursementDatasourceImpl extends ReimbursementDatasource {
    createReimbursement(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async saveReimbursement(reimbursementDto: ReimbursementDto, invoiceId: number): Promise<ReimbursementEntity> {
        try {
            let uuid: string;
            if (reimbursementDto.uuid == null) {uuid = v4()} else {uuid = reimbursementDto.uuid}

            const [reimbursementDb, create] = await ReimbursementSequelize.findOrCreate({
                where: {
                    uuid: uuid,
                    invoiceId: invoiceId
                },
                defaults: {
                    reimbursementDocAuthorizationNumber: reimbursementDto.reimbursementDocAuthorizationNumber,
                    reimbursementDocCode: reimbursementDto.reimbursementDocCode,
                    reimbursementDocEmissionPoint: reimbursementDto.reimbursementDocEmissionPoint,
                    reimbursementDocEstablishment: reimbursementDto.reimbursementDocEstablishment,
                    reimbursementDocIssueDate: reimbursementDto.reimbursementDocIssueDate,
                    reimbursementDocSequential: reimbursementDto.reimbursementDocSequential,
                    reimbursementProviderCountryCode: reimbursementDto.reimbursementProviderCountryCode,
                    reimbursementProviderIdentification: reimbursementDto.reimbursementProviderIdentification,
                    reimbursementProviderIdentificationType: reimbursementDto.reimbursementProviderIdentificationType,
                    reimbursementProviderType: reimbursementDto.reimbursementProviderType,
                    uuid: uuid,
                    invoiceId: invoiceId
                }
            })

            let taxDetails: TaxDetailEntity[] = []

            for (let i = 0; i < reimbursementDto.taxDetails.length; i++) {
                const element = reimbursementDto.taxDetails[i];
                taxDetails.push(await new TaxDetailDatasourceImpl().saveTaxDetail(element, reimbursementDb.id))
            }            
            reimbursementDb.taxDetails = taxDetails

            let reimbursementCompensations: ReimbursementCompensationEntity[] = []
            for (let i = 0; i < reimbursementDto.reimbursementCompensations.length; i++) {
                const element = reimbursementDto.reimbursementCompensations[i];
                reimbursementCompensations.push(await new ReimbursementCompensationDatasourceImpl().saveReimbursementCompensation(element, reimbursementDb.id))
            }

            reimbursementDb.reimbursementCompensations = reimbursementCompensations
            
            if (create) {
                return ReimbursementEntity.create(reimbursementDb)
            }

            reimbursementDb.reimbursementDocAuthorizationNumber = reimbursementDto.reimbursementDocAuthorizationNumber
            reimbursementDb.reimbursementDocCode = reimbursementDto.reimbursementDocCode
            reimbursementDb.reimbursementDocEmissionPoint = reimbursementDto.reimbursementDocEmissionPoint
            reimbursementDb.reimbursementDocEstablishment = reimbursementDto.reimbursementDocEstablishment
            reimbursementDb.reimbursementDocIssueDate = reimbursementDto.reimbursementDocIssueDate
            reimbursementDb.reimbursementDocSequential = reimbursementDto.reimbursementDocSequential
            reimbursementDb.reimbursementProviderCountryCode = reimbursementDto.reimbursementProviderCountryCode
            reimbursementDb.reimbursementProviderIdentification = reimbursementDto.reimbursementProviderIdentification
            reimbursementDb.reimbursementProviderIdentificationType = reimbursementDto.reimbursementProviderIdentificationType
            reimbursementDb.reimbursementProviderType = reimbursementDto.reimbursementProviderType

            await reimbursementDb.save()
            return ReimbursementEntity.create(reimbursementDb)
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    updateReimbursement(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteReimbursement(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getReimbursementByUuid(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getReimbursementsByInvoiceId(invoiceId: number): Promise<ReimbursementEntity[]> {
        try {
            const reimbursements = await ReimbursementSequelize.findAll({
                where: {
                    invoiceId: invoiceId
                }
            })

            for (let i = 0; i < reimbursements.length; i++) {
                const element = reimbursements[i];
                element.taxDetails = await new TaxDetailDatasourceImpl().getTaxDetailsByReimbursementId(element.id)
                element.reimbursementCompensations = await new ReimbursementCompensationDatasourceImpl().getReimbursementCompensationsByReimbursementId(element.id);
            }

            return reimbursements.map(reimbursement => ReimbursementEntity.create(reimbursement))
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
}