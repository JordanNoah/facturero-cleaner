import { ProductTagEntity } from "./productTags.entity"

export class ProductEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public code: string,
        public price: number,
        public hasIva: boolean,
        public percentageCode: number,
        public institutionId: number,
        public tags: ProductTagEntity[],
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}
    static create(object:{[key:string]:any}): ProductEntity {
        const { 
            id,
            uuid,
            name,
            code,
            price,
            has_iva,
            percentage_code,
            institution_id,
            tags,
            createdAt,
            updatedAt,
            deletedAt } = object

        let tagsArray:ProductTagEntity[] = []

        for (let i = 0; i < tags.length; i++) {
            tagsArray.push(ProductTagEntity.create(tags[i]))
        }

        return new ProductEntity(
            id,
            uuid,
            name,
            code,
            price,
            has_iva,
            percentage_code,
            institution_id,
            tagsArray,
            createdAt,
            updatedAt,
            deletedAt
        )
    }
}

export class ProductPaginationEntity {
    constructor(
        public products:ProductEntity[],
        public totalItems:number,
        public totalPages: number,
    ){}

    static create(object:{[key:string]:any}): ProductPaginationEntity {
        const { products, totalItems, totalPages } = object

        return new ProductPaginationEntity(
            products.map((product:any) => ProductEntity.create(product)),
            totalItems,
            totalPages
        )
    }
}