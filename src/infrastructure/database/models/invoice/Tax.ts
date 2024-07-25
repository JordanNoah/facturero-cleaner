import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize"

interface TaxRow {
    id: number,
    uuid: string,
    code: number,
    percentageCode: number,
    rate: number,
    taxableBase: number,
    value: number,
    detailId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class TaxSequelize extends Model<TaxRow,Omit<TaxRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare code: number
    declare percentageCode: number
    declare rate: number
    declare taxableBase: number
    declare value: number
    declare detailId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

TaxSequelize.init({
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
    code:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    percentageCode:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    rate:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    taxableBase:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    value:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    detailId:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    underscored: true,
    modelName: 'tax',
    timestamps: true,
    paranoid: true
})