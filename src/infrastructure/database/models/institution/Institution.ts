import { DataTypes, Model } from "sequelize"
import {sequelize} from "../../sequelize";

interface InstitutionRow {
    id: number,
    uuid: string,
    name: string,
    abbreviation: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class InstitutionSequelize extends Model<InstitutionRow,Omit<InstitutionRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare name: string
    declare abbreviation: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

InstitutionSequelize.init({
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
    }
},{
    sequelize,
    underscored:true,
    tableName: "institution",
    timestamps: true,
    paranoid: true
})