export default class TaxDetailEntity {
    constructor(
        public id: number,
        public uuid: string,
        public code: number,
        public percentageCode: number,
        public rate: number,
        public reimbursementTaxableBase: number,
        public reimbursementTax: number,
        public reimbursementId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static create(object:{[key:string]:any}): TaxDetailEntity {
        const { id, uuid, code, percentageCode, rate, reimbursementTaxableBase, reimbursementTax, reimbursementId, createdAt, updatedAt, deletedAt } = object
        return new TaxDetailEntity(
            id,
            uuid,
            code,
            percentageCode,
            rate,
            reimbursementTaxableBase,
            reimbursementTax,
            reimbursementId,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}