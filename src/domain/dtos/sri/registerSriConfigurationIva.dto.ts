export default class RegisterSriConfigurationIvaDto {
    constructor(
        public id: number,
        public code: string,
        public percentage: number | null,
        public title: string | null,
        public createdAt: null | Date,
        public updatedAt: null | Date,
        public deletedAt: null | Date
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterSriConfigurationIvaDto?]{
        const {
            id,
            code,
            percentage,
            title,
            createdAt,
            updatedAt,
            deletedAt
        } = object

        return [
            undefined,
            new RegisterSriConfigurationIvaDto(
                id,
                code,
                percentage,
                title,
                createdAt,
                updatedAt,
                deletedAt
            )
        ]
    }
}