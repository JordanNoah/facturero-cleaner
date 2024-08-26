import { TaxDetailDatasource } from "../../../../domain/datasource/invoice/reimbursement/taxDetail.datasource";
import TaxDetailDto from "../../../../domain/dtos/invoice/reimbursement/taxtDetail.dto";
import TaxDetailEntity from "../../../../domain/entities/invoice/reimbursement/taxDetail.entity";
import { v4 } from "uuid"
import { TaxDetailSequelize } from "../../../database/models/invoice/reimbursement/TaxDetail";

export default class TaxDetailDatasourceImpl extends TaxDetailDatasource {
    createTaxDetail(): Promise<TaxDetailEntity> {
        throw new Error("Method not implemented.");
    }
    deleteTaxDetail(uuid: string): Promise<TaxDetailEntity> {
        throw new Error("Method not implemented.");
    }
    getTaxDetailByUuid(uuid: string): Promise<TaxDetailEntity | null> {
        throw new Error("Method not implemented.");
    }
    async getTaxDetailsByReimbursementId(reimbursementId: number): Promise<TaxDetailEntity[]> {
        try {
            const taxDetails = await TaxDetailSequelize.findAll({
                where:{
                    reimbursementId: reimbursementId
                }
            })

            return taxDetails.map(taxDetail => TaxDetailEntity.create(taxDetail))
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    async saveTaxDetail(taxDetailDto: TaxDetailDto, reimbursementId: number): Promise<TaxDetailEntity> {
        try {
            let uuid: string;
            if (taxDetailDto.uuid == null) {uuid = v4()} else {uuid = taxDetailDto.uuid}
            const [taxDetailDb, create] = await TaxDetailSequelize.findOrCreate({
                where:{
                    reimbursementId: reimbursementId,
                    uuid: uuid
                },
                defaults:{
                    code: taxDetailDto.code,
                    percentageCode: taxDetailDto.percentageCode,
                    rate: taxDetailDto.rate,
                    reimbursementId: reimbursementId,
                    uuid: uuid,
                    reimbursementTax: taxDetailDto.reimbursementTax,
                    reimbursementTaxableBase: taxDetailDto.reimbursementTaxableBase
                }
            })

            if (create){
                return TaxDetailEntity.create(taxDetailDb)
            }

            taxDetailDb.code = taxDetailDto.code
            taxDetailDb.percentageCode = taxDetailDto.percentageCode
            taxDetailDb.rate = taxDetailDto.rate
            taxDetailDb.reimbursementTax = taxDetailDto.reimbursementTax
            taxDetailDb.reimbursementTaxableBase = taxDetailDto.reimbursementTaxableBase
            await taxDetailDb.save()

            return TaxDetailEntity.create(taxDetailDb)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    updateTaxDetail(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}