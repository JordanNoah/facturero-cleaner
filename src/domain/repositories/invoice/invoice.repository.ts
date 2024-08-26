import InvoiceDto from "../../dtos/invoice/invoice.dto";
import { InvoiceEntity } from "../../entities/invoice/invoice.entity";
import PaginationDto from "../../dtos/pagination.dto";

export abstract class InvoiceRepository {
    abstract createInvoice(): Promise<InvoiceEntity>
    abstract saveInvoice(invoiceDto: InvoiceDto): Promise<any>
    abstract updateInvoice(): Promise<any>
    abstract deleteInvoice(uuid:string): Promise<InvoiceEntity>
    abstract getInvoiceByUuid(uuid:string,withIncludes:boolean): Promise<InvoiceEntity | null>
    abstract getInvoicesByPagination(paginationDto:PaginationDto): Promise<InvoiceEntity[]>
}