import InvoiceAdditionalDetailDto from "../../dtos/invoice/invoiceAdditionalDetail.dto";
import { InvoiceAdditionalDetailEntity } from "../../entities/invoice/invoiceAdditionalDetail.entity";

export abstract class InvoiceAdditionalDetailDatasource {
    abstract getInvoiceAdditionalDetailByUuid(uuid:string): Promise<any>
    abstract getInvoiceAdditionalDetailByInvoiceUuid(uuid:string): Promise<any>
    abstract getInvoiceAdditionalDetailsByInvoiceId(invoiceId:number): Promise<InvoiceAdditionalDetailEntity[]>
    abstract saveInvoiceAdditionalDetail(invoiceAdditionalDetailDto: InvoiceAdditionalDetailDto, invoiceId: number): Promise<InvoiceAdditionalDetailEntity>
    abstract updateInvoiceAdditionalDetail(invoiceAdditionalDetailDto: any): Promise<any>
    abstract deleteInvoiceAdditionalDetail(uuid:string): Promise<any>
    abstract createInvoiceAdditionalDetail(): Promise<any>
}