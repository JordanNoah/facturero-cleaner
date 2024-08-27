import PaginationDto from "../../dtos/pagination.dto";
import RegisterProductDto from "../../dtos/product/register-product.dto";
import { ProductEntity, ProductPaginationEntity } from "../../entities/product/product.entity";

export abstract class ProductDatasource {
    abstract getProducts(): Promise<ProductEntity[]>;
    abstract getProductById(id: number): Promise<ProductEntity | null>;
    abstract getProductByUuid(uuid: string): Promise<ProductEntity | null>;
    abstract createProduct(product: RegisterProductDto): Promise<ProductEntity>;
    abstract deleteProduct(id: number): Promise<ProductEntity>;
    abstract getProductsByPagination(pagination:PaginationDto): Promise<ProductPaginationEntity>;
    abstract getTotalCount(): Promise<number>;
}