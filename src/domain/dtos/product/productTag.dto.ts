export default class ProductTagDto {
    constructor(
        public name:string
    ){}
    static create(object:{[key:string]:any}):[string?,ProductTagDto?]{
        const {
            name
        } = object
        return [
            undefined,
            new ProductTagDto(
                name
            )
        ]
    }
}