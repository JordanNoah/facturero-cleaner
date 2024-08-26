import QuickAccessInvoiceDto from "../dtos/invoice/quickAccessInvoice.dto";
import PaginationDto from "../dtos/pagination.dto";
import {QuickAccessInvoiceEntity, QuickAccessInvoicePaginationEntity} from "../entities/invoice/quickAccessInvoice.entity";

export abstract class QuickAccessInvoiceDatasource {
    abstract createQuickAccessInvoice(): Promise<QuickAccessInvoiceEntity>
    abstract saveQuickAccessInvoice(quickAccessInvoiceDto: QuickAccessInvoiceDto): Promise<QuickAccessInvoiceEntity>
    abstract updateQuickAccessInvoice(): Promise<any>
    abstract deleteQuickAccessInvoice(uuid:string): Promise<QuickAccessInvoiceEntity>
    abstract getQuickAccessInvoiceByUuid(uuid:string): Promise<QuickAccessInvoiceEntity | null>
    abstract getQuickAccessInvoicesByPagination(pagination:PaginationDto): Promise<QuickAccessInvoicePaginationEntity>
    abstract getQuickAccessInvoicesCountTotal(): Promise<number>
}