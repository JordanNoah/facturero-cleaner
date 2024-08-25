import InvoiceDocumentEntity from "./invoiceDocument.entity"

export class QuickAccessInvoiceEntity {
    constructor(
        public id: number,
        public uuid: string,
        public environment: number,
        public issueType: number,
        public businessName: string,
        public tradeName: string,
        public taxId: string,
        public accessKey: string,
        public docCode: string,
        public establishment: string,
        public emissionPoint: string,
        public sequential: string,
        public headquartersAddress: string,
        public withholdingAgent: string,
        public rimpeTaxpayer: string,
        public numberInvoice: string,
        public buyerBusinessName: string,
        public buyerIdentification: string,
        public totalAmount: number,
        public invoiceDocuments: InvoiceDocumentEntity[],
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}
    static create(object:{[key:string]:any}): QuickAccessInvoiceEntity {
        const { id, uuid, environment, issueType, businessName, tradeName, taxId, accessKey, docCode, establishment, emissionPoint, sequential, headquartersAddress, withholdingAgent, rimpeTaxpayer, numberInvoice, buyerBusinessName, buyerIdentification, totalAmount, invoiceDocuments, createdAt, updatedAt, deletedAt } = object

        return new QuickAccessInvoiceEntity(
            id,
            uuid,
            environment,
            issueType,
            businessName,
            tradeName,
            taxId,
            accessKey,
            docCode,
            establishment,
            emissionPoint,
            sequential,
            headquartersAddress,
            withholdingAgent,
            rimpeTaxpayer,
            numberInvoice,
            buyerBusinessName,
            buyerIdentification,
            totalAmount,
            invoiceDocuments.map((invoiceDocument: any) => InvoiceDocumentEntity.create(invoiceDocument)),
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}

export class QuickAccessInvoicePaginationEntity {
    constructor(
        public quickAccessInvoices: QuickAccessInvoiceEntity[],
        public totalItems: number,
        public totalPages: number
    ){}
    static create(object:{[key:string]:any}): QuickAccessInvoicePaginationEntity {
        const { quickAccessInvoices, totalItems, totalPages } = object
        return new QuickAccessInvoicePaginationEntity(
            quickAccessInvoices.map((quickAccessInvoice: any) => QuickAccessInvoiceEntity.create(quickAccessInvoice)),
            totalItems,
            totalPages
        )
    }
}