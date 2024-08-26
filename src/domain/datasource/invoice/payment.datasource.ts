import PaymentDto from "../../dtos/invoice/payment.dto";
import PaymentEntity from "../../entities/invoice/payment.entity";

export default abstract class PaymentDatasource {
    abstract createPayment(): Promise<PaymentEntity>
    abstract savePayment(paymentDto: PaymentDto, invoiceInfoId: number): Promise<PaymentEntity>
    abstract updatePayment(): Promise<any>
    abstract deletePayment(uuid:string): Promise<PaymentEntity>
    abstract getPaymentByUuid(uuid:string): Promise<PaymentEntity | null>
    abstract getPaymentsByInvoiceInfoId(invoiceInfoId: number): Promise<PaymentEntity[]>
}