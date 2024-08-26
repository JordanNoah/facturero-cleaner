import RegisterProductDto from "../../dtos/product/register-product.dto"
import { ProductEntity } from "../../entities/product/product.entity";

export abstract class ProductRepository {
    abstract getProducts(): Promise<ProductEntity[]>;
    abstract getProductById(id: number): Promise<ProductEntity | null>;
    abstract getProductByUuid(uuid: string): Promise<ProductEntity | null>;
    abstract createProduct(product: RegisterProductDto): Promise<ProductEntity>;
    abstract deleteProduct(id: number): Promise<ProductEntity>;
}