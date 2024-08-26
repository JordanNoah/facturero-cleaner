import InvoiceInfoDto from "../../dtos/invoice/invoiceInfo.dto";
import { InvoiceInfoEntity } from "../../entities/invoice/invoiceInfo.entity";
import InvoiceInfoDto from "../dtos/invoice/invoiceInfo.dto";
import TotalWithTaxesDto from "../dtos/invoice/totalWithTaxes.dto";
import { InvoiceInfoEntity } from "../entities/invoice/invoiceInfo.entity";

export default abstract class InvoiceInfoDatasource {
    abstract getInvoiceInfoByUuid(uuid:string): Promise<any>
    abstract getInvoiceInfoByInvoiceUuid(uuid:string): Promise<any>
    abstract getInvoiceInfoByInvoiceId(invoiceId:number): Promise<InvoiceInfoEntity | null>
    abstract saveInvoiceInfo(invoiceInfoDto: InvoiceInfoDto, invoiceId: number): Promise<InvoiceInfoEntity>
    abstract updateInvoiceInfo(invoiceInfoDto: any): Promise<any>
    abstract deleteInvoiceInfo(uuid:string): Promise<any>
    abstract createInvoiceInfo(): Promise<any>
    abstract getInvoiceInfoTotalTaxesByCode(code: number, percentageCode:number | null, totalWithTaxes:TotalWithTaxesDto[]): number
}