import { DetailDatasource } from "../../../domain/datasource/invoice/detail.datasource";
import { DetailDto } from "../../../domain/dtos/invoice/detail.dto";
import DetailEntity from "../../../domain/entities/invoice/detail.entity";
import { DetailSequelize } from "../../database/models/invoice/Detail";
import AdditionalDetailEntity from "../../../domain/entities/invoice/additionalDetail.entity";
import { v4 } from "uuid"
import AdditionalDetailDatasourceImpl from "./additionalDetail.datasource.impl";
import TaxEntity from "../../../domain/entities/invoice/tax.entity";
import TaxDatasourceImpl from "./tax.datasource.impl";

export default class DetailDatasourceImpl extends DetailDatasource {
    async createDetail(): Promise<DetailEntity> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    async deleteDetail(uuid: string): Promise<DetailEntity> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    async getDetailByUuid(uuid: string): Promise<DetailEntity | null> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    async getDetailsByInvoiceId(invoiceId: number): Promise<DetailEntity[]> {
        try {
            let details = await DetailSequelize.findAll({ where: { invoiceId: invoiceId } })

            let detailEntity: DetailEntity[] = []
            for (let i = 0; i < details.length; i++) {
                const element = details[i];
                element.additionalDetails = await new AdditionalDetailDatasourceImpl().getAdditionalDetailsByDetailId(element.id)
                element.taxes = await new TaxDatasourceImpl().getTaxesByDetailId(element.id)
                detailEntity.push(DetailEntity.create(element))
            }

            return detailEntity
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    async saveDetail(detailDto: DetailDto, invoiceId: number): Promise<DetailEntity> {
        try {
            let uuid: string;
            if (detailDto.uuid == null) {uuid = v4()} else {uuid = detailDto.uuid}
            const [detailDb, create] = await DetailSequelize.findOrCreate({
                where:{
                    uuid: uuid,
                    invoiceId: invoiceId
                },
                defaults:{
                    uuid: uuid,
                    mainCode: detailDto.mainCode,
                    auxiliaryCode: detailDto.auxiliaryCode,
                    description: detailDto.description,
                    unitOfMeasure: detailDto.unitOfMeasure,
                    quantity: detailDto.quantity,
                    unitPrice: detailDto.unitPrice,
                    priceWithoutSubsidy: detailDto.priceWithoutSubsidy,
                    discount: detailDto.discount,
                    totalPriceWithoutTax: detailDto.totalPriceWithoutTax,
                    invoiceId: invoiceId
                }
            })

            let additionalDetails: AdditionalDetailEntity[] = []

            for (let i = 0; i < detailDto.additionalDetails.length; i++) {
                const element = detailDto.additionalDetails[i];
                
                additionalDetails.push(await new AdditionalDetailDatasourceImpl().saveAdditionalDetail(element, detailDb.id))
            }

            detailDb.additionalDetails = additionalDetails

            let taxes: TaxEntity[] = []
            for (let i = 0; i < detailDto.taxes.length; i++) {
                const element = detailDto.taxes[i];
                taxes.push(await new TaxDatasourceImpl().saveTax(element, detailDb.id))
            }

            detailDb.taxes = taxes

            if (create) {
                return DetailEntity.create(detailDb)
            }

            detailDb.mainCode = detailDto.mainCode
            detailDb.auxiliaryCode = detailDto.auxiliaryCode
            detailDb.description = detailDto.description
            detailDb.unitOfMeasure = detailDto.unitOfMeasure
            detailDb.quantity = detailDto.quantity
            detailDb.unitPrice = detailDto.unitPrice
            detailDb.priceWithoutSubsidy = detailDto.priceWithoutSubsidy
            detailDb.discount = detailDto.discount
            detailDb.totalPriceWithoutTax = detailDto.totalPriceWithoutTax
            detailDb.invoiceId = invoiceId
            
            await detailDb.save()
            return DetailEntity.create(detailDb)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    async updateDetail(): Promise<any> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
}