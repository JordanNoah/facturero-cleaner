import ProductTagDto from "../../dtos/product/productTag.dto";
import { ProductTagEntity } from "../../entities/product/productTags.entity";

export abstract class ProductTagDatasource {
    abstract getProductTags(): Promise<ProductTagEntity[]>;
    abstract getProductTagById(id: number): Promise<ProductTagEntity | null>;
    abstract getProductTagsByProductId(productId: number): Promise<ProductTagEntity[]>;
    abstract createProductTag(ProductTagDto: ProductTagDto, productId:number): Promise<ProductTagEntity>;
    abstract deleteProductTag(id: number): Promise<ProductTagEntity>;
    abstract deleteProductTagsByProductId(productId: number): Promise<void>;
    abstract getTotalCountByProductId(productId:number): Promise<number>;
}