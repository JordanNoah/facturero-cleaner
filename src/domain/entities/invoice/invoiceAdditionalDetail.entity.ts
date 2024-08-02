export class InvoiceAdditionalDetailEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public value: string,
        public invoiceId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static create(object:{[key:string]:any}): InvoiceAdditionalDetailEntity {
        const { id, uuid, name, value, invoiceId, createdAt, updatedAt, deletedAt } = object
        return new InvoiceAdditionalDetailEntity(
            id,
            uuid,
            name,
            value,
            invoiceId,
            createdAt,
            updatedAt,
            deletedAt
        )
    }
}