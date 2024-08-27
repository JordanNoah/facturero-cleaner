import { ProductDatasource } from "../../../domain/datasource/product/product.datasource";
import PaginationDto from "../../../domain/dtos/pagination.dto";
import RegisterProductDto from "../../../domain/dtos/product/register-product.dto";
import { ProductEntity, ProductPaginationEntity } from "../../../domain/entities/product/product.entity";
import { ProductRepository } from "../../../domain/repositories/product/product.repository";

export class ProductRepositoryImpl implements ProductRepository {
    constructor(
        private readonly productDatasource: ProductDatasource
    ) {}

    async getProducts(): Promise<ProductEntity[]> {
        return this.productDatasource.getProducts();
    }

    async getProductById(id: number): Promise<ProductEntity | null> {
        return this.productDatasource.getProductById(id);
    }

    async getProductByUuid(uuid: string): Promise<ProductEntity | null> {
        return this.productDatasource.getProductByUuid(uuid);
    }

    async createProduct(product: RegisterProductDto): Promise<ProductEntity> {
        return this.productDatasource.createProduct(product);
    }

    async deleteProduct(id: number): Promise<ProductEntity> {
        return this.productDatasource.deleteProduct(id);
    }

    async getProductsByPagination(pagination: PaginationDto): Promise<ProductPaginationEntity> {
        return this.productDatasource.getProductsByPagination(pagination);
    }
}