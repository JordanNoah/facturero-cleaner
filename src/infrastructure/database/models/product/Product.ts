import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../sequelize";
import { InstitutionSequelize } from "../institution/Institution";
import { ProductTagSequelize } from "./ProductTags";
import { ProductTagEntity } from "../../../../domain/entities/product/productTags.entity";

interface ProductRow {
    id: number,
    uuid: string,
    name: string | null,
    code: string | null,
    price: number,
    has_iva: boolean,
    percentage_code: number | null,
    institution_id: number,
    createdAt?: null | Date,
    updatedAt?: null | Date,
    deletedAt?: null | Date
}

export class ProductSequelize extends Model<ProductRow, Omit<ProductRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare name: string | null
    declare code: string | null
    declare price: number
    declare has_iva: boolean
    declare percentage_code: number | null
    declare institution_id: number
    declare readonly createdAt: null | Date
    declare readonly updatedAt: null | Date
    declare readonly deletedAt: null | Date
    declare institution:InstitutionSequelize
    declare tags:ProductTagSequelize[] | ProductTagEntity[]
}

ProductSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    has_iva: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    percentage_code: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    institution_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: InstitutionSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    underscored:true,
    tableName: "products",
    timestamps: true,
    paranoid: true
})

ProductSequelize.belongsTo(InstitutionSequelize,{
    foreignKey: 'institution_id',
    as: 'institution'
})

ProductSequelize.hasMany(ProductTagSequelize, {
    foreignKey: 'product_id',
    as: 'tags'
})

ProductTagSequelize.belongsTo(ProductSequelize, {
    foreignKey: 'product_id',
    as: 'product'
})