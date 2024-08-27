import ProductTagDto from "../../dtos/product/productTag.dto";
import { ProductTagEntity } from "../../entities/product/productTags.entity";

export abstract class ProductTagRepository {
    abstract getProductTags(productId:number): Promise<ProductTagEntity[]>;
    abstract getProductTagById(id: number): Promise<ProductTagEntity | null>;
    abstract getProductTagByUuid(uuid: string): Promise<ProductTagEntity | null>;
    abstract createProductTag(ProductTagDto: ProductTagDto): Promise<ProductTagEntity>;
    abstract deleteProductTag(id: number): Promise<ProductTagEntity>;
    abstract getTotalCountByProductId(): Promise<number>;
}