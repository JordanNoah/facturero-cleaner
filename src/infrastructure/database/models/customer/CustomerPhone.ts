import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize"

interface CustomerPhoneRow {
    id: number,
    phone: string,
    customer_id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class CustomerPhoneSequelize extends Model<CustomerPhoneRow,Omit<CustomerPhoneRow,'id'>> {
    declare id: number
    declare phone: string
    declare customer_id: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

CustomerPhoneSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull:false
    },
    customer_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    underscored:true,
    tableName: "customer_phone",
    timestamps: true,
    paranoid: true
});