import DetailEntity from "./detail.entity"
import { FinancialInformationEntity } from "./financialInformation.entity"
import { InvoiceAdditionalDetailEntity } from "./invoiceAdditionalDetail.entity"
import { InvoiceInfoEntity } from "./invoiceInfo.entity"
import ReimbursementEntity from "./reimbursement.entity"
import WhitHoldingEntity from "./withHolding.entity"

export class InvoiceEntity {
    constructor(
        public id?:number,
        public uuid?:string,
        public financialInformation?: FinancialInformationEntity | null,
        public invoiceInfo?: InvoiceInfoEntity | null,
        public details?: DetailEntity[],
        public reimbursements?: ReimbursementEntity[],
        public withHoldings?: WhitHoldingEntity[],
        public invoiceAdditionalDetails?: InvoiceAdditionalDetailEntity[],
        public createdAt?:Date,
        public updatedAt?:Date,
        public deletedAt?:Date | null,
        public numberInvoice?:String
    ){}

    static create(object:{[key:string]:any}): InvoiceEntity {
        const { id, uuid, financialInformation, invoiceInfo, details, reimbursements, withHoldings, invoiceAdditionalDetails,createdAt, updatedAt, deletedAt } = object

        let detailsArray: DetailEntity[] = []
        if(details) {
            detailsArray = details.map((detail:any) => DetailEntity.create(detail))
        }

        let reimbursementsArray: ReimbursementEntity[] = []
        if(reimbursements) {
            reimbursementsArray = reimbursements.map((reimbursement:any) => ReimbursementEntity.create(reimbursement))
        }

        let withHoldingsArray: WhitHoldingEntity[] = []
        if(withHoldings) {
            withHoldingsArray = withHoldings.map((withHolding:any) => WhitHoldingEntity.create(withHolding))
        }

        let invoiceAdditionalDetailsArray: InvoiceAdditionalDetailEntity[] = []
        if(invoiceAdditionalDetails) {
            invoiceAdditionalDetailsArray = invoiceAdditionalDetails.map((invoiceAdditionalDetail:any) => InvoiceAdditionalDetailEntity.create(invoiceAdditionalDetail))
        }

        return new InvoiceEntity(
            id,
            uuid,
            financialInformation ? FinancialInformationEntity.create(financialInformation) : null,
            invoiceInfo ? InvoiceInfoEntity.create(invoiceInfo) : null,
            detailsArray,
            reimbursementsArray,
            withHoldingsArray,
            invoiceAdditionalDetailsArray,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }

    static getSequelize(object:{[key:string]:any}): InvoiceEntity {
        const { id, uuid, financialInformation, invoiceInfo, details, reimbursements, withHoldings, invoiceAdditionalDetails,createdAt, updatedAt, deletedAt } = object

        let detailsArray: DetailEntity[] = []
        if(details) {
            detailsArray = details.map((detail:any) => DetailEntity.create(detail))
        }        

        let reimbursementsArray: ReimbursementEntity[] = []
        if(reimbursements) {
            reimbursementsArray = reimbursements.map((reimbursement:any) => ReimbursementEntity.create(reimbursement))
        }

        let withHoldingsArray: WhitHoldingEntity[] = []
        if(withHoldings) {
            withHoldingsArray = withHoldings.map((withHolding:any) => WhitHoldingEntity.create(withHolding))
        }

        let invoiceAdditionalDetailsArray: InvoiceAdditionalDetailEntity[] = []
        if(invoiceAdditionalDetails) {
            invoiceAdditionalDetailsArray = invoiceAdditionalDetails.map((invoiceAdditionalDetail:any) => InvoiceAdditionalDetailEntity.create(invoiceAdditionalDetail))
        }

        return new InvoiceEntity(
            id,
            uuid,
            financialInformation ? FinancialInformationEntity.create(financialInformation) : null,
            invoiceInfo ? InvoiceInfoEntity.create(invoiceInfo) : null,
            detailsArray,
            reimbursementsArray,
            withHoldingsArray,
            invoiceAdditionalDetailsArray,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }

    static pagination(object:{[key:string]:any}): InvoiceEntity {
        const { id, uuid, financialInformation, invoiceInfo, details, reimbursements, withHoldings, invoiceAdditionalDetails,createdAt, updatedAt, deletedAt } = object
                
        return new InvoiceEntity(
            id,
            uuid,
            financialInformation,
            invoiceInfo,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            null,
            `${financialInformation.establishment}-${financialInformation.emissionPoint}-${financialInformation.sequential}`
        )
    }
}