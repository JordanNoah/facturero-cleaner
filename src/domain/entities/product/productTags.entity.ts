export class ProductTagEntity{
    constructor(
        public id: number,
        public product_id: number,
        public value_tag: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static create(object:{[key:string]:any}): ProductTagEntity {
        const { id, product_id, value_tag, createdAt, updatedAt, deletedAt } = object
        return new ProductTagEntity(
            id,
            product_id,
            value_tag,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}