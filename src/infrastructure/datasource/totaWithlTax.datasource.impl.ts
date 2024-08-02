import TotalWithTaxDatasource from "../../domain/datasource/totaWithlTax.datasource";
import TotalWithTaxesDto from "../../domain/dtos/invoice/totalWithTaxes.dto";
import TotalWithTaxEntity from "../../domain/entities/invoice/totalWithTax.entity";
import { v4 } from "uuid"
import { TotalWithTaxSequelize } from "../database/models/invoice/TotalWithTax";

export default class TotalWithTaxDatasourceImpl extends TotalWithTaxDatasource {
    createTotalWithTax(): Promise<TotalWithTaxEntity> {
        throw new Error("Method not implemented.");
    }
    deleteTotalWithTax(uuid: string): Promise<TotalWithTaxEntity> {
        throw new Error("Method not implemented.");
    }
    getTotalWithTaxByUuid(uuid: string): Promise<TotalWithTaxEntity | null> {
        throw new Error("Method not implemented.");
    }
    async getTotalsWithTaxByInvoiceInfoId(invoiceInfoId: number): Promise<TotalWithTaxEntity[]> {
        try {
            const totalsWithTax = await TotalWithTaxSequelize.findAll({
                where:{
                    invoiceInfoId: invoiceInfoId
                }
            })

            return totalsWithTax.map(totalWithTax => TotalWithTaxEntity.create(totalWithTax))
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    async saveTotalWithTax(totalWithTaxDto: TotalWithTaxesDto, invoiceInfo: number): Promise<TotalWithTaxEntity> {
        try {
            let uuid: string;
            if (totalWithTaxDto.uuid == null) {uuid = v4()} else {uuid = totalWithTaxDto.uuid}
            const [totalWithTaxDb, create] = await TotalWithTaxSequelize.findOrCreate({
                where:{
                    uuid: uuid,
                    invoiceInfoId: invoiceInfo
                },
                defaults:{
                    invoiceInfoId: invoiceInfo,
                    uuid: uuid,
                    code: totalWithTaxDto.code,
                    additionalDiscount: totalWithTaxDto.additionalDiscount,
                    percentageCode: totalWithTaxDto.percentageCode,
                    rate: totalWithTaxDto.rate,
                    taxableBase: totalWithTaxDto.taxableBase,
                    taxRefundValue: totalWithTaxDto.taxRefundValue,
                    value: totalWithTaxDto.value
                }
            })

            if (create) {
                return TotalWithTaxEntity.create(totalWithTaxDb)
            }

            totalWithTaxDb.code = totalWithTaxDto.code
            totalWithTaxDb.additionalDiscount = totalWithTaxDto.additionalDiscount
            totalWithTaxDb.percentageCode = totalWithTaxDto.percentageCode
            totalWithTaxDb.rate = totalWithTaxDto.rate
            totalWithTaxDb.taxableBase = totalWithTaxDto.taxableBase
            totalWithTaxDb.taxRefundValue = totalWithTaxDto.taxRefundValue
            totalWithTaxDb.value = totalWithTaxDto.value

            await totalWithTaxDb.save()
            return TotalWithTaxEntity.create(totalWithTaxDb)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
}