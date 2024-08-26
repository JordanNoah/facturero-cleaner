export default class InvoiceDocumentEntity {
    constructor(
        public id: number,
        public uuid: string,
        public type: string,
        public url: string,
        public invoiceId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static create(object:{[key:string]:any}): InvoiceDocumentEntity {
        const { id, uuid, type, url, invoiceInfoId, createdAt, updatedAt, deletedAt } = object
        return new InvoiceDocumentEntity(
            id,
            uuid,
            type,
            url,
            invoiceInfoId,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}