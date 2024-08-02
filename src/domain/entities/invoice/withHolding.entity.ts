export default class WithHoldingEntity {
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

    static create(object:{[key:string]:any}): WithHoldingEntity {
        const { id, uuid, code, percentageCode, rate, value, invoiceId, createdAt, updatedAt, deletedAt } = object
        return new WithHoldingEntity(
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