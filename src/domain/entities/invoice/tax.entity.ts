export default class TaxEntity {
    constructor(
        public id: number,
        public uuid: string,
        public code: number,
        public percentageCode: number,
        public rate: number,
        public taxableBase: number,
        public value: number,
        public detailId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static create(object:{[key:string]:any}): TaxEntity {
        const { id, uuid, code, percentageCode, rate, taxableBase, value, detailId, createdAt, updatedAt, deletedAt } = object
        return new TaxEntity(
            id,
            uuid,
            code,
            percentageCode,
            rate,
            taxableBase,
            value,
            detailId,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}