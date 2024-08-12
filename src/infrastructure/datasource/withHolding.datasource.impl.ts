import { WithHoldingDataSource } from "../../domain/datasource/withHolding.datasource";
import WithHoldingDto from "../../domain/dtos/invoice/withHolding.dto";
import WhitHoldingEntity from "../../domain/entities/invoice/withHolding.entity";
import { v4 } from "uuid"
import { WithHoldingSequelize } from "../database/models/invoice/WithHolding";

export class WithHoldingDataSourceImpl extends WithHoldingDataSource {
    createWithHoldings(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteWithHolding(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getWithHolding(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async getWithHoldingsByInvoiceId(invoiceId: number): Promise<WhitHoldingEntity[]> {
        try {
            const withHoldings = await WithHoldingSequelize.findAll({
                where:{
                    invoiceId: invoiceId
                }
            })
            return withHoldings.map(withHolding => WhitHoldingEntity.create(withHolding))
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    getWithHoldingByUuid(uuid: string): Promise<number | null> {
        throw new Error("Method not implemented.");
    }
    async saveWithHolding(withHoldingDto: WithHoldingDto, invoiceId: number): Promise<WhitHoldingEntity> {
        try {
            let uuid: string;
            if (withHoldingDto.uuid == null) {uuid = v4()} else {uuid = withHoldingDto.uuid}
            const [withHoldingDb, create] = await WithHoldingSequelize.findOrCreate({
                where:{
                    invoiceId: invoiceId,
                    uuid: uuid
                },
                defaults:{
                    code: withHoldingDto.code,
                    percentageCode: withHoldingDto.percentageCode,
                    rate: Number(withHoldingDto.rate).toPrecision(4),
                    value: Number(withHoldingDto.value).toPrecision(4),
                    invoiceId: invoiceId,
                    uuid: uuid
                }
            })
            if (create){
                return WhitHoldingEntity.create(withHoldingDb)
            }
            withHoldingDb.code = withHoldingDto.code
            withHoldingDb.percentageCode = withHoldingDto.percentageCode
            withHoldingDb.rate = Number(withHoldingDto.rate).toPrecision(4)
            withHoldingDb.value = Number(withHoldingDto.value).toPrecision(4)
            await withHoldingDb.save()
            return WhitHoldingEntity.create(withHoldingDb)
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    updateWithHolding(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}