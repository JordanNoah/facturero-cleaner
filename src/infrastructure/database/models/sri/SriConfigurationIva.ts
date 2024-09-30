import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize";

interface SriConfigurationIvaRow {
    id: number,
    code: string,
    percentage: number | null,
    title: string | null,
    createdAt?: null | Date,
    updatedAt?: null | Date,
    deletedAt?: null | Date
}

export class SriConfigurationIvaSequelize extends Model<SriConfigurationIvaRow, Omit<SriConfigurationIvaRow, 'id'>> {
    declare id: number
    declare code: string
    declare percentage: number | null
    declare title: string | null
    declare readonly createdAt: null | Date
    declare readonly updatedAt: null | Date
    declare readonly deletedAt: null | Date
}

SriConfigurationIvaSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    percentage: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    sequelize,
    underscored:true,
    tableName: "sri_configuration_iva",
    timestamps: true,
    paranoid: true
})