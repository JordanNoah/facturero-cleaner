import { TaxDatasource } from "../../domain/datasource/tax.datasource";
import { v4 } from "uuid"
import { TaxSequelize } from "../database/models/invoice/Tax";
import TaxEntity from "../../domain/entities/invoice/tax.entity";
import { TaxDto } from "../../domain/dtos/invoice/tax.dto";

export default class TaxDatasourceImpl extends TaxDatasource {
    createTax(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteTax(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getTaxByUuid(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getTaxesByDetailId(detailId: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async saveTax(taxDto: TaxDto, detailId: number): Promise<any> {
        try {
            let uuid: string;
            if (taxDto.uuid == null) {uuid = v4()} else {uuid = taxDto.uuid}
            const [taxDb, create] = await TaxSequelize.findOrCreate({
                where:{
                    uuid: uuid,
                    detailId: detailId
                },
                defaults:{
                    code: taxDto.code,
                    percentageCode: taxDto.percentageCode,
                    rate: taxDto.rate,
                    taxableBase: taxDto.taxableBase,
                    value: taxDto.value,
                    detailId: detailId,
                    uuid: uuid
                }
            })

            if(create){
                return TaxEntity.create(taxDb)
            }

            taxDb.code = taxDto.code
            taxDb.percentageCode = taxDto.percentageCode
            taxDb.rate = taxDto.rate
            taxDb.taxableBase = taxDto.taxableBase
            taxDb.value = taxDto.value

            await taxDb.save()
            return TaxEntity.create(taxDb)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    updateTax(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}