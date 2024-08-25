import { FinancialInformationEntity } from "../../entities/invoice/financialInformation.entity";
import { InvoiceInfoEntity } from "../../entities/invoice/invoiceInfo.entity";

export default class QuickAccessInvoiceDto {
    constructor(
        public invoiceId: number,
        public uuid: string,
        public financialInformation: FinancialInformationEntity,
        public invoiceInfo: InvoiceInfoEntity
    ){}

    static create(object:{[key:string]:any}): [string?, QuickAccessInvoiceDto?] {
        const {
            id,
            uuid,
            financialInformation,
            invoiceInfo
        } = object

        return [
            undefined,
            new QuickAccessInvoiceDto(
                id,
                uuid,
                financialInformation,
                invoiceInfo
            )
        ]
    }
}