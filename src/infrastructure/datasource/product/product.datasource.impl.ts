import { Op } from "sequelize";
import { ProductDatasource } from "../../../domain/datasource/product/product.datasource";
import PaginationDto from "../../../domain/dtos/pagination.dto";
import RegisterProductDto from "../../../domain/dtos/product/register-product.dto";
import { ProductEntity, ProductPaginationEntity } from "../../../domain/entities/product/product.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { ProductSequelize } from "../../database/models/product/Product";
import { InstitutionDatasourceImpl } from "../institution/institution.datasource.impl";
import { v4 as uuidv4 } from "uuid"
import { ProductTagDatasourceImpl } from "./productTag.datasource.impl";
import { ProductTagEntity } from "../../../domain/entities/product/productTags.entity";

export class ProductDatasourceImpl extends ProductDatasource {
    async createProduct(registerProductDto: RegisterProductDto): Promise<ProductEntity> {
        try {
            const {id,code,has_iva,institution_id,labels,name,price,uuid,percentage_code} = registerProductDto;

            const institution = new InstitutionDatasourceImpl().getById(institution_id);
            if(!institution) throw CustomError.notFound("Institution not found");

            const [product,created] = await ProductSequelize.findOrCreate({
                where:{
                    id:id
                },
                defaults:{
                    uuid:uuidv4(),
                    name:name,
                    code:code,
                    price:price,
                    has_iva:has_iva,
                    percentage_code:percentage_code,
                    institution_id:institution_id
                },
            })

            let productTags: ProductTagEntity[]= []
            for (let i = 0; i < labels.length; i++) {
                const label = labels[i];
                const productTag = await new ProductTagDatasourceImpl().createProductTag(label,product.id);
                if(!productTag) throw CustomError.notFound("Product tag not found")
                productTags.push(productTag)
            }

            if(!created) return ProductEntity.create(product);

            product.name = name;
            product.code = code;
            product.price = price;
            product.has_iva = has_iva;
            product.percentage_code = percentage_code;
            product.tags = productTags;

            await product.save()
            return ProductEntity.create(product);
        } catch (error) { 
            console.log(error)
            
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async deleteProduct(id: number): Promise<ProductEntity> {
        try {
            const product = await this.getProductById(id);
            if (!product) throw CustomError.notFound("Product not found");
            await ProductSequelize.destroy({
                where:{
                    id:id
                }
            })
            return product;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getProductById(id: number): Promise<ProductEntity | null> {
        try {
            const product = await ProductSequelize.findByPk(id);
            if (!product) return null;
            return ProductEntity.create(product);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getProductByUuid(uuid: string): Promise<ProductEntity | null> {
        try {
            const product = await ProductSequelize.findOne({
                where:{
                    uuid:uuid
                }
            })
            if (!product) return null;
            return ProductEntity.create(product);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getProducts(): Promise<ProductEntity[]> {
        try {
            const products = await ProductSequelize.findAll();
            return products.map(product => ProductEntity.create(product));
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    
    async getProductsByPagination(pagination: PaginationDto): Promise<ProductPaginationEntity> {
        try {
            let offset = (pagination.page - 1) * pagination.itemsPerPage
            let limit = pagination.itemsPerPage
            let where = {}
            if(pagination.search && pagination.search.length > 0){
                where = {
                    [Op.or]: [
                        { name: { [Op.like]: `%${pagination.search}%` } },
                        { abbreviation: { [Op.like]: `%${pagination.search}%` } },
                        { productType: { [Op.like]: `%${pagination.search}%` } }
                    ]
                }
            }

            let products = await ProductSequelize.findAll({
                limit:limit,
                offset:offset,
                where:where
            })

            const totalItems = await this.getTotalCount();

            return ProductPaginationEntity.create({
                products:products,
                totalItems:totalItems,
                totalPages:Math.ceil(totalItems/pagination.itemsPerPage)
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }

    async getTotalCount(): Promise<number> {
        try {
            return await ProductSequelize.count();
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}