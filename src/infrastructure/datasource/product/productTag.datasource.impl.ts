import { ProductTagDatasource } from "../../../domain/datasource/product/productTag.datasource";
import ProductTagDto from "../../../domain/dtos/product/productTag.dto";
import { ProductTagEntity } from "../../../domain/entities/product/productTags.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { ProductTagSequelize } from "../../database/models/product/ProductTags";

export class ProductTagDatasourceImpl extends ProductTagDatasource {
    async createProductTag(ProductTagDto: ProductTagDto,productId:number): Promise<ProductTagEntity> {
        try {
            const [productTag,created] = await ProductTagSequelize.findOrCreate({
                where:{
                    product_id:productId,
                    value_tag:ProductTagDto.name
                },
                defaults:{
                    product_id:productId,
                    value_tag:ProductTagDto.name
                }
            });
            return ProductTagEntity.create(productTag);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async deleteProductTag(id: number): Promise<ProductTagEntity> {
        try {
            let productTag = await ProductTagSequelize.findOne({where:{id:id}});
            if(!productTag) throw CustomError.notFound("Product tag not found");
            await productTag.destroy();
            return ProductTagEntity.create(productTag);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getProductTagById(id: number): Promise<ProductTagEntity | null> {
        try {
            const productTag = await ProductTagSequelize.findOne({where:{id:id}})
            if(!productTag) return null;
            return ProductTagEntity.create(productTag);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getProductTagsByProductId(productId: number): Promise<ProductTagEntity | null> {
        try {
            const productTag = await ProductTagSequelize.findAll({where:{product_id:productId}})
            if(!productTag) return null;
            return ProductTagEntity.create(productTag);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getProductTags(): Promise<ProductTagEntity[]> {
        try {
            let productTags = await ProductTagSequelize.findAll();
            return productTags.map(productTag => ProductTagEntity.create(productTag));
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getTotalCountByProductId(productId:number): Promise<number> {
        try {
            return await ProductTagSequelize.count({where:{product_id:productId}});
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}