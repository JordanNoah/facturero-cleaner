import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../sequelize"

interface CustomerRow {
    id: number,
    uuid: string,
    full_name: string,
    identification_type: string,
    identification: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class CustomerSequelize extends Model<CustomerRow,Omit<CustomerRow,'id'>> {
    declare id: number
    declare uuid: string
    declare full_name: string
    declare identification_type: string
    declare identification: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
    declare emails: string[]
    declare phones: string[]
}

CustomerSequelize.init({
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
    full_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    identification_type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    identification:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    underscored:true,
    tableName: "customer",
    timestamps: true,
    paranoid: true
});