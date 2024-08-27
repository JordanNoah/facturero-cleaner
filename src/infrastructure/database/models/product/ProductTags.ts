import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize";
import { ProductSequelize } from "./Product";

interface ProductTagRow {
    id:number,
    product_id:number,
    value_tag:string,
    createdAt?:Date,
    updatedAt?:Date,
    deletedAt?:Date
}

export class ProductTagSequelize extends Model<ProductTagRow, Omit<ProductTagRow, 'id'>> {
    declare id:number
    declare product_id:number
    declare value_tag:string
    declare readonly createdAt:Date
    declare readonly updatedAt:Date
    declare readonly deletedAt:Date
}

ProductTagSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: ProductSequelize,
            key:'id'
        }
    },
    value_tag:{
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    underscored: true,
    tableName: 'product_tags',
    timestamps: true,
    paranoid: true
})