export default abstract class PaymentDatasource {
    abstract createPayment(): Promise<PaymentEntity>
    abstract savePayment(paymentDto: PaymentDto): Promise<PaymentEntity>
    abstract updatePayment(): Promise<any>
    abstract deletePayment(uuid:string): Promise<PaymentEntity>
    abstract getPaymentByUuid(uuid:string): Promise<PaymentEntity | null>
    abstract getPaymentByInvoiceId(invoiceId: number): Promise<PaymentEntity | null>
}