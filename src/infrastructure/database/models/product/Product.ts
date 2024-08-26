import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../sequelize";
import { InstitutionSequelize } from "../institution/Institution";

interface ProductRow {
    id:number,
    uuid:string,
    name:string,
    abbreviation:string,
    productType:string,
    price:number,
    has_iva:boolean,
    institution_id:number,
    createdAt?:Date,
    updatedAt?:Date,
    deletedAt?:Date
}

export class ProductSequelize extends Model<ProductRow, Omit<ProductRow, 'id'>> {
    declare id:number
    declare uuid:string
    declare name:string
    declare abbreviation:string
    declare productType:string
    declare price:number
    declare has_iva:boolean
    declare institution_id:number
    declare readonly createdAt:Date
    declare readonly updatedAt:Date
    declare readonly deletedAt:Date
    declare institution:InstitutionSequelize
}

ProductSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    uuid:{
        type: DataTypes.UUID,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    abbreviation:{
        type: DataTypes.STRING,
        allowNull:false
    },
    productType:{
        type: DataTypes.STRING,
        allowNull:false
    },
    price:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    has_iva:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    institution_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
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