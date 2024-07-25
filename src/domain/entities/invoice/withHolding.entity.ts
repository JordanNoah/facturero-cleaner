export default class WhitHoldingEntity {
    constructor(
        public id: number,
        public uuid: string,
        public code: number,
        public percentageCode: number,
        public rate: number,
        public value: number,
        public invoiceId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static create(object:{[key:string]:any}): WhitHoldingEntity {
        const { id, uuid, code, percentageCode, rate, value, invoiceId, createdAt, updatedAt, deletedAt } = object
        return new WhitHoldingEntity(
            id,
            uuid,
            code,
            percentageCode,
            rate,
            value,
            invoiceId,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}