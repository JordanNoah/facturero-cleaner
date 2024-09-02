import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize"

interface CustomerEmailRow {
    id: number,
    email: string,
    customer_id: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class CustomerEmailSequelize extends Model<CustomerEmailRow,Omit<CustomerEmailRow,'id'>> {
    declare id: number
    declare email: string
    declare customer_id: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

CustomerEmailSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    email:{
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
    tableName: "customer_email",
    timestamps: true,
    paranoid: true
});