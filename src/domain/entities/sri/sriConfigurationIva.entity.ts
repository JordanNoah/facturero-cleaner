export class SriConfigurationIvaEntity {
    constructor(
        public id: number,
        public code: string,
        public percentage: number | null,
        public title: string | null,
        public createdAt: null | Date,
        public updatedAt: null | Date,
        public deletedAt: null | Date
    ){}

    static create(object:{[key:string]:any}):SriConfigurationIvaEntity {
        const {
            id,
            code,
            percentage,
            title,
            createdAt,
            updatedAt,
            deletedAt
        } = object

        return new SriConfigurationIvaEntity(
            id,
            code,
            percentage,
            title,
            createdAt,
            updatedAt,
            deletedAt
        )
    }    
}