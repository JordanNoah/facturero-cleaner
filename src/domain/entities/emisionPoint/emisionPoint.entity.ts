export default class EmisionPointEntity {
    constructor(
        public id: number,
        public code: string,
        public establishment_id: number,
        public createdAt: string,
        public updatedAt: string,
        public deletedAt: string | null
    ) {}

    static create(object:{[key:string]:any}): EmisionPointEntity {
        const { id, code, establishment_id, createdAt, updatedAt, deletedAt } = object
                
        return new EmisionPointEntity(
            id,
            code,
            establishment_id,
            createdAt,
            updatedAt,
            deletedAt
        );
    }
}