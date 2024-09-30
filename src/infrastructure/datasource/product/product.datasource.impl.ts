import { Op, FindOptions } from "sequelize";
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
                    price_with_iva: has_iva ? price * 1.12 : null,
                    institution_id:institution_id
                },
            })

            const productTagDatasourceImpl = new ProductTagDatasourceImpl();
            let productTagsEntity: ProductTagEntity[] = await productTagDatasourceImpl.getProductTagsByProductId(product.id);

            const validTags = labels.map(tag => tag.name);
            const notNeedTags = productTagsEntity.filter(tag => !validTags.includes(tag.value_tag));
            for (let i = 0; i < notNeedTags.length; i++) {
                await productTagDatasourceImpl.deleteProductTag(notNeedTags[i].id);
            }

            let existingTags = await productTagDatasourceImpl.getProductTagsByProductId(product.id);
            let missingTags = labels.filter(tag => !existingTags.map(tag => tag.value_tag).includes(tag.name));

            for (let i = 0; i < missingTags.length; i++) {
                existingTags.push(await productTagDatasourceImpl.createProductTag(missingTags[i],product.id));
            }
            product.tags = existingTags;
            if(created) return ProductEntity.create(product);

            product.name = name;
            product.code = code;
            product.price = price;
            product.has_iva = has_iva;
            product.percentage_code = percentage_code;

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
            await new ProductTagDatasourceImpl().deleteProductTagsByProductId(id);
            await ProductSequelize.destroy({
                where:{
                    id:id
                }
            })
            return product;
        } catch (error) {
            console.log(error);
            
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
            product.tags = await new ProductTagDatasourceImpl().getProductTagsByProductId(product.id);
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
            product.tags = await new ProductTagDatasourceImpl().getProductTagsByProductId(product.id);
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
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                const productTags = await new ProductTagDatasourceImpl().getProductTagsByProductId(product.id);
                product.tags = productTags;
            }
            return products.map(product => ProductEntity.create(product));
        } catch (error) {
            console.log(error)
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
            
            let order: Array<[string, 'ASC' | 'DESC']> = [];

            if (pagination.orderKey && pagination.orderType) {
                order.push([pagination.orderKey, pagination.orderType]);
            }

            let options: FindOptions = {
                where: where,
                order: order
            }

            if(pagination.itemsPerPage !== -1){
                options.limit = limit;
                options.offset = offset;
            }

            let products = await ProductSequelize.findAll(options)

            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                const productTags = await new ProductTagDatasourceImpl().getProductTagsByProductId(product.id);
                product.tags = productTags;
            }

            const totalItems = await this.getTotalCount();

            return ProductPaginationEntity.create({
                products:products,
                totalItems:totalItems,
                totalPages:Math.ceil(totalItems/pagination.itemsPerPage)
            })
        } catch (error) {
            console.log(error);
            
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
    async getProductByType(type: string, value:string): Promise<ProductEntity[]> {
        try {
            let where = {}
            if (type === "code") {
                where = {
                    code: {
                        [Op.like]: `%${value}%`
                    }
                }
            }
            if (type === "name") {
                where = {
                    name: value
                }
            }

            const products = await ProductSequelize.findAll({
                where: where
            })

            return products.map(product => ProductEntity.create(product));
        } catch (error) {
            console.log(error);
            
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}