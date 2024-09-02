export default class ProductTagDto {
    constructor(
        public name:string
    ){}
    static create(object:{[key:string]:any}):[string?,ProductTagDto?]{
        const {
            value_tag
        } = object
        return [
            undefined,
            new ProductTagDto(
                value_tag
            )
        ]
    }
}