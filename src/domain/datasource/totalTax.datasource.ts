export default abstract class TotalTaxDatasource {
    abstract getTotalTax(): Promise<number>
    abstract updateTotalTax(): Promise<any>
    abstract deleteTotalTax(): Promise<any>
    abstract getTotalTaxByUuid(uuid:string): Promise<number | null>
    abstract getTotalTaxByInvoiceId(invoiceId: number): Promise<number | null>
    abstract createTotalTaxes(): Promise<number>
}