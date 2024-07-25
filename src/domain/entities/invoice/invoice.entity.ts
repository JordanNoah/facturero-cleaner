import DetailEntity from "./detail.entity"
import { FinancialInformationEntity } from "./financialInformation.entity"
import { InvoiceInfoEntity } from "./invoiceInfo.entity"
import ReimbursementEntity from "./reimbursement.entity"
import WhitHoldingEntity from "./withHolding.entity"

export class InvoiceEntity {
    constructor(
        public id:number,
        public uuid:string,
        public financialInformation: FinancialInformationEntity | null,
        public invoiceInfo: InvoiceInfoEntity | null,
        public details: DetailEntity[],
        public reimbursements: ReimbursementEntity[],
        public withHoldings: WhitHoldingEntity[],
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date | null
    ){}

    static create(object:{[key:string]:any}): InvoiceEntity {
        const { id, uuid, financialInformation, invoiceInfo, details, reimbursements, withHoldings,createdAt, updatedAt, deletedAt } = object

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

        return new InvoiceEntity(
            id,
            uuid,
            financialInformation ? FinancialInformationEntity.create(financialInformation) : null,
            invoiceInfo ? InvoiceInfoEntity.create(invoiceInfo) : null,
            detailsArray,
            reimbursementsArray,
            withHoldingsArray,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}