import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../sequelize";
import { AdditionalDetailSequelize } from "./AdditionalDetail";
import AdditionalDetailEntity from "../../../../domain/entities/invoice/additionalDetail.entity";
import { TaxSequelize } from "./Tax";
import TaxEntity from "../../../../domain/entities/invoice/tax.entity";

interface DetailRow {
    id: number,
    uuid: string,
    mainCode: string,
    auxiliaryCode: string,
    description: string,
    unitOfMeasure: string,
    quantity: string,
    unitPrice: string,
    priceWithoutSubsidy: string,
    discount: string,
    totalPriceWithoutTax: string,
    invoiceId: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class DetailSequelize extends Model<DetailRow,Omit<DetailRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare mainCode: string
    declare auxiliaryCode: string
    declare description: string
    declare unitOfMeasure: string
    declare quantity: string
    declare unitPrice: string
    declare priceWithoutSubsidy: string
    declare discount: string
    declare totalPriceWithoutTax: string
    declare invoiceId: number
    declare additionalDetails: AdditionalDetailSequelize[] | AdditionalDetailEntity[]
    declare taxes: TaxSequelize[] | TaxEntity[]
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

DetailSequelize.init({
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
    mainCode:{
        type: DataTypes.STRING,
        allowNull:false
    },
    auxiliaryCode:{
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    },
    unitOfMeasure:{
        type: DataTypes.STRING,
        allowNull:false
    },
    quantity:{
        type: DataTypes.STRING,
        allowNull:false
    },
    unitPrice:{
        type: DataTypes.STRING,
        allowNull:false
    },
    priceWithoutSubsidy:{
        type: DataTypes.STRING,
        allowNull:false
    },
    discount:{
        type: DataTypes.STRING,
        allowNull:false
    },
    totalPriceWithoutTax:{
        type: DataTypes.STRING,
        allowNull:false
    },
    invoiceId:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    underscored: true,
    modelName: 'detail',
    timestamps: true,
    paranoid: true
})