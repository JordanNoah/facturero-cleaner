import { CompensationSequelize } from "../../../infrastructure/database/models/invoice/Compensation"

export default class CompensationEntity {
    constructor(
        public id: number,
        public uuid: string,
        public code: number | null,
        public rate: number | null,
        public value: number | null,
        public invoiceInfoId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ) {}

    static create(object:{[key:string]:any}): CompensationEntity {
        const { id, uuid, code, rate, value, invoiceInfoId, createdAt, updatedAt, deletedAt } = object
        return new CompensationEntity(
            id,
            uuid,
            code,
            rate,
            value,
            invoiceInfoId,
            createdAt,
            updatedAt,
            deletedAt
        )
    }

    static getSequelize(compensation: CompensationSequelize): CompensationEntity {
        return new CompensationEntity(
            compensation.id,
            compensation.uuid,
            compensation.code,
            compensation.rate,
            compensation.value,
            compensation.invoiceInfoId,
            compensation.createdAt,
            compensation.updatedAt,
            compensation.deletedAt
        )
    }
}