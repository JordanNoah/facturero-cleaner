import PaymentDatasource from "../../domain/datasource/payment.datasource";
import PaymentDto from "../../domain/dtos/invoice/payment.dto";
import PaymentEntity from "../../domain/entities/invoice/payment.entity";
import { v4 } from "uuid"
import { PaymentSequelize } from "../database/models/invoice/Payment";

export default class PaymentDatasourceImpl extends PaymentDatasource {
    createPayment(): Promise<PaymentEntity> {
        throw new Error("Method not implemented.");
    }
    deletePayment(uuid: string): Promise<PaymentEntity> {
        throw new Error("Method not implemented.");
    }
    getPaymentByInvoiceId(invoiceId: number): Promise<PaymentEntity | null> {
        throw new Error("Method not implemented.");
    }
    getPaymentByUuid(uuid: string): Promise<PaymentEntity | null> {
        throw new Error("Method not implemented.");
    }
    async getPaymentsByInvoiceInfoId(invoiceInfoId: number): Promise<PaymentEntity[]>{
        try {
            const payments = await PaymentSequelize.findAll({
                where:{
                    invoiceInfoId: invoiceInfoId
                }
            })

            return payments.map(payment => PaymentEntity.create(payment))
        } catch (error) {
            throw error
        }
    }
    async savePayment(paymentDto: PaymentDto, invoiceInfoId: number): Promise<PaymentEntity> {
        try {
            let uuid: string;
            if (paymentDto.uuid == null) {uuid = v4()} else {uuid = paymentDto.uuid}
            const [paymentDb, create] = await PaymentSequelize.findOrCreate({
                where:{
                    uuid: uuid,
                    invoiceInfoId: invoiceInfoId
                },
                defaults:{
                    invoiceInfoId: invoiceInfoId,
                    uuid: uuid,
                    paymentMethod: paymentDto.paymentMethod,
                    total: Number(paymentDto.total)?.toPrecision(4),
                    term: paymentDto.term,
                    timeUnit: paymentDto.timeUnit
                }
            })

            if (create) {
                return PaymentEntity.create(paymentDb)
            }

            paymentDb.paymentMethod = paymentDto.paymentMethod
            paymentDb.total = Number(paymentDto.total!).toPrecision(4)
            paymentDb.term = paymentDto.term
            paymentDb.timeUnit = paymentDto.timeUnit
            await paymentDb.save()
            return PaymentEntity.create(paymentDb)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    updatePayment(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}