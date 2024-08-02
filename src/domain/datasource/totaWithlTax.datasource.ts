import TotalWithTaxesDto from "../dtos/invoice/totalWithTaxes.dto";
import TotalWithTaxEntity from "../entities/invoice/totalWithTax.entity";

export default abstract class TotalWithTaxDatasource {
    abstract createTotalWithTax(): Promise<TotalWithTaxEntity>
    abstract saveTotalWithTax(totalWithTaxDto: TotalWithTaxesDto, invoiceInfo: number): Promise<TotalWithTaxEntity>
    abstract deleteTotalWithTax(uuid: string): Promise<TotalWithTaxEntity>
    abstract getTotalWithTaxByUuid(uuid: string): Promise<TotalWithTaxEntity | null>
    abstract getTotalsWithTaxByInvoiceInfoId(invoiceInfoId: number): Promise<TotalWithTaxEntity[]>
}