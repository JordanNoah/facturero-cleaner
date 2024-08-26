import { PaymentSequelize } from "../../../infrastructure/database/models/invoice/Payment"

export default class PaymentEntity {
    constructor(
        public id: number,
        public uuid: string,
        public paymentMethod: number | null,
        public total: string | null,
        public term: number | null,
        public timeUnit: string | null,
        public invoiceInfoId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static create(object:{[key:string]:any}): PaymentEntity {
        const { id, uuid, paymentMethod, total, term, timeUnit, invoiceInfoId, createdAt, updatedAt, deletedAt } = object
        return new PaymentEntity(
            id,
            uuid,
            paymentMethod,
            total,
            term,
            timeUnit,
            invoiceInfoId,
            createdAt,
            updatedAt,
            deletedAt
        )
    }

    static getSequelize(payment: PaymentSequelize): PaymentEntity {
        return new PaymentEntity(
            payment.id,
            payment.uuid,
            payment.paymentMethod,
            payment.total,
            payment.term,
            payment.timeUnit,
            payment.invoiceInfoId,
            payment.createdAt,
            payment.updatedAt,
            payment.deletedAt
        )
    }
}