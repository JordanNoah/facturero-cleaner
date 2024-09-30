export class InstitutionEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public ruc: string,
        public address: string,
        public hasToAccounting: boolean,
        public abbreviation: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public deletedAt?: Date | null
    ) {}

    static create(object:{[key:string]:any}):InstitutionEntity {
        const {
            id,
            uuid,
            name,
            ruc,
            address,
            hasToAccounting,
            abbreviation,
            createdAt,
            updatedAt,
            deletedAt
        } = object

        return new InstitutionEntity(
            id,
            uuid,
            name,
            ruc,
            address,
            hasToAccounting,
            abbreviation,
            createdAt,
            updatedAt,
            deletedAt
        )
    }
}