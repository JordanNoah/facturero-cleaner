import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize"

interface AdditionalDetailRow {
    id: number,
    uuid: string,
    name: string,
    value: string,
    detailId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class AdditionalDetailSequelize extends Model<AdditionalDetailRow,Omit<AdditionalDetailRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare name: string
    declare value: string
    declare detailId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

AdditionalDetailSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    value:{
        type: DataTypes.STRING,
        allowNull:false
    },
    detailId:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    underscored: true,
    modelName: 'additional_detail',
    timestamps: true,
    paranoid: true
})