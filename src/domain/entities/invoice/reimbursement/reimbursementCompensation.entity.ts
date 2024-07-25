export default class ReimbursementCompensationEntity {
    constructor(
        public id: number,
        public uuid: string,
        public code: number,
        public rate: number,
        public value: number,
        public reimbursementId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static create(object:{[key:string]:any}): ReimbursementCompensationEntity {
        const { id, uuid, code, rate, value, reimbursementId, createdAt, updatedAt, deletedAt } = object
        return new ReimbursementCompensationEntity(
            id,
            uuid,
            code,
            rate,
            value,
            reimbursementId,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}