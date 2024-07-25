export default class AdditionalDetailEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public value: string,
        public detailId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static create(object:{[key:string]:any}): AdditionalDetailEntity {
        const { id, uuid, name, value, detailId, createdAt, updatedAt, deletedAt } = object
        return new AdditionalDetailEntity(
            id,
            uuid,
            name,
            value,
            detailId,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}