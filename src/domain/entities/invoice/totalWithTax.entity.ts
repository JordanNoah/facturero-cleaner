export default class TotalWithTaxEntity {
    constructor(
        public id: number,
        public uuid: string,
        public code: string,
        public percentageCode: string,
        public additionalDiscount: string,
        public taxableBase: string,
        public rate: string,
        public value: string,
        public taxRefundValue: string,
        public invoiceInfoId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static create(object:{[key:string]:any}): TotalWithTaxEntity {
        const { id, uuid, code, percentageCode, additionalDiscount, taxableBase, rate, value, taxRefundValue, invoiceInfoId, createdAt, updatedAt, deletedAt } = object
        return new TotalWithTaxEntity(
            id,
            uuid,
            code,
            percentageCode,
            additionalDiscount,
            taxableBase,
            rate,
            value,
            taxRefundValue,
            invoiceInfoId,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}