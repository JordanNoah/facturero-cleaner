import { CompensationDatasource } from "../../../domain/datasource/invoice/compesation.datasource";
import CompensationDto from "../../../domain/dtos/invoice/compesation.dto";
import CompensationEntity from "../../../domain/entities/invoice/compensation.entity";
import { v4 } from "uuid"
import { CompensationSequelize } from "../../database/models/invoice/Compensation";

export default class CompensationDatasourceImpl extends CompensationDatasource {
    createCompensation(): Promise<CompensationEntity> {
        throw new Error("Method not implemented.");
    }
    deleteCompensation(uuid: string): Promise<CompensationEntity> {
        throw new Error("Method not implemented.");
    }
    async getCompensationsByInvoiceInfoId(invoiceInfoId: number): Promise<CompensationEntity[]> {
        try {
            const compensations = await CompensationSequelize.findAll({
                where:{
                    invoiceInfoId: invoiceInfoId
                }
            })

            return compensations.map(compensation => CompensationEntity.create(compensation))
        }catch (error) {
            throw error
        }
    }
    getCompensationByUuid(uuid: string): Promise<CompensationEntity | null> {
        throw new Error("Method not implemented.");
    }
    async saveCompensation(compensationDto: CompensationDto, invoiceInfoId:number): Promise<CompensationEntity> {
        try {
            let uuid: string;
            if (compensationDto.uuid == null) {uuid = v4()} else {uuid = compensationDto.uuid}
            const [compensationDb, create] = await CompensationSequelize.findOrCreate({
                where:{
                    uuid: uuid,
                    invoiceInfoId: invoiceInfoId
                },
                defaults:{
                    invoiceInfoId: invoiceInfoId,
                    uuid: uuid,
                    code: compensationDto.code,
                    rate: Number(compensationDto.rate!).toPrecision(4),
                    value: Number(compensationDto.value!).toPrecision(4)
                }
            })

            if (create) {
                return CompensationEntity.create(compensationDb)
            }

            compensationDb.code = compensationDto.code
            compensationDb.rate = Number(compensationDto.rate!).toPrecision(4),
            compensationDb.value = Number(compensationDto.value!).toPrecision(4)
            await compensationDb.save()
            return CompensationEntity.create(compensationDb)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    updateCompensation(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}