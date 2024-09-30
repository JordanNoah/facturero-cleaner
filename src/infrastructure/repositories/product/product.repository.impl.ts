import { ProductDatasource } from "../../../domain/datasource/product/product.datasource";
import PaginationDto from "../../../domain/dtos/pagination.dto";
import RegisterProductDto from "../../../domain/dtos/product/register-product.dto";
import { ProductEntity, ProductPaginationEntity } from "../../../domain/entities/product/product.entity";
import { ProductRepository } from "../../../domain/repositories/product/product.repository";

export class ProductRepositoryImpl implements ProductRepository {
    constructor(
        private readonly productDatasource: ProductDatasource
    ) {}

    getProducts(): Promise<ProductEntity[]> {
        return this.productDatasource.getProducts();
    }

    getProductById(id: number): Promise<ProductEntity | null> {
        return this.productDatasource.getProductById(id);
    }

    getProductByUuid(uuid: string): Promise<ProductEntity | null> {
        return this.productDatasource.getProductByUuid(uuid);
    }

    createProduct(product: RegisterProductDto): Promise<ProductEntity> {
        return this.productDatasource.createProduct(product);
    }

    deleteProduct(id: number): Promise<ProductEntity> {
        return this.productDatasource.deleteProduct(id);
    }

    getProductsByPagination(pagination: PaginationDto): Promise<ProductPaginationEntity> {
        return this.productDatasource.getProductsByPagination(pagination);
    }
    getProductByType(type: string, value: string): Promise<ProductEntity[]> {
        return this.productDatasource.getProductByType(type, value);
    }
}