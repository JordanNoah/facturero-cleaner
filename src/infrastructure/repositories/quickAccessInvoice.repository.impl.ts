import { QuickAccessInvoiceDatasource } from "../../domain/datasource/invoice/quickAccessInvoice.datasource";
import PaginationDto from "../../domain/dtos/pagination.dto";
import { QuickAccessInvoicePaginationEntity } from "../../domain/entities/invoice/quickAccessInvoice.entity";
import QuickAccessInvoiceRepository from "../../domain/repositories/invoice/quickAccessInvoice.repository";

export default class QuickAccessInvoiceRepositoryImpl implements QuickAccessInvoiceRepository {
    constructor (
        private readonly quickAccessInvoiceDatasource: QuickAccessInvoiceDatasource
    ) {}

    getQuickAccessInvoicesByPagination(pagination:PaginationDto): Promise<QuickAccessInvoicePaginationEntity> {
        return this.quickAccessInvoiceDatasource.getQuickAccessInvoicesByPagination(pagination)
    }
}