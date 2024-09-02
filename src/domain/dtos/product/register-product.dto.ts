import ProductTagDto from "./productTag.dto"

export default class RegisterProductDto {
    constructor(
        public id: number,
        public uuid: string | null,
        public name: string | null,
        public code: string | null,
        public labels: ProductTagDto[],
        public price: number,
        public has_iva: boolean,
        public percentage_code: number,
        public institution_id: number,
        public createdAt: null | Date,
        public updatedAt: null | Date,
        public deletedAt: null | Date
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterProductDto?]{
        const {
            id,
            uuid,
            name,
            code,
            tags,
            price,
            hasIva,
            percentageCode,
            institution_id,
            createdAt,
            updatedAt,
            deletedAt
        } = object

        let labelsArray:ProductTagDto[] = []
        for (let i = 0; i < tags.length; i++) {
            const [error, productTag] = ProductTagDto.create(tags[i])            
            if (error) return [error]
            labelsArray.push(productTag!)
        }

        return [
            undefined,
            new RegisterProductDto(
                id,
                uuid,
                name,
                code,
                labelsArray,
                price,
                hasIva,
                percentageCode,
                institution_id,
                createdAt,
                updatedAt,
                deletedAt
            )
        ]
    }
}