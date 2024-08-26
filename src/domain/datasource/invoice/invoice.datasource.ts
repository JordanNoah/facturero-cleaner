import InvoiceDto from "../dtos/invoice/invoice.dto";
import PaginationDto from "../dtos/pagination.dto";
import { InvoiceEntity } from "../entities/invoice/invoice.entity";
import InvoiceDto from "../../dtos/invoice/invoice.dto";
import { InvoiceEntity } from "../../entities/invoice/invoice.entity";

export default abstract class InvoiceDatasource {
    abstract createInvoice(): Promise<InvoiceEntity>
    abstract saveInvoice(invoiceDto: InvoiceDto): Promise<InvoiceEntity>
    abstract updateInvoice(): Promise<any>
    abstract deleteInvoice(uuid:string): Promise<InvoiceEntity>
    abstract getInvoiceByUuid(uuid:string, withIncludes:boolean): Promise<InvoiceEntity | null>
    abstract getInvoicesByPagination(paginationDto:PaginationDto): Promise<InvoiceEntity[]>
}