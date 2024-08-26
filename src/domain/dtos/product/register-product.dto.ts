export default class RegisterProductDto {
    constructor(
        public name: string,
        public abbreviation: string,
        public productType: string,
        public price: number,
        public has_iva: boolean,
        public institution_id: number
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterProductDto?]{
        const {
            name,
            abbreviation,
            productType,
            price,
            has_iva,
            institution_id
        } = object
        return [
            undefined,
            new RegisterProductDto(
                name,
                abbreviation,
                productType,
                price,
                has_iva,
                institution_id
            )
        ]
    }
}