import AdditionalDetailEntity from "./additionalDetail.entity"
import TaxEntity from "./tax.entity"

export default class DetailEntity {
    constructor(
        public id:number,
        public uuid:string,
        public invoiceId:number,
        public mainCode: string,
        public auxiliaryCode: string,
        public description: string,
        public unitOfMeasure: string,
        public quantity: string,
        public unitPrice: string,
        public priceWithoutSubsidy: string,
        public discount: string,
        public totalPriceWithoutTax: string,
        public additionalDetails: AdditionalDetailEntity[],
        public taxes: TaxEntity[],
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date | null
    ){}

    static create(object:{[key:string]:any}): DetailEntity {
        const { id, uuid, invoiceId, mainCode, auxiliaryCode, description, unitOfMeasure, quantity, unitPrice, priceWithoutSubsidy, discount, totalPriceWithoutTax, additionalDetails, taxes,createdAt, updatedAt, deletedAt } = object
        return new DetailEntity(
            id,
            uuid,
            invoiceId,
            mainCode,
            auxiliaryCode,
            description,
            unitOfMeasure,
            quantity,
            unitPrice,
            priceWithoutSubsidy,
            discount,
            totalPriceWithoutTax,
            additionalDetails,
            taxes,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}