import { QuickAccessInvoiceDatasource } from "../../domain/datasource/quickAccessInvoice.datasource";
import PaginationDto from "../../domain/dtos/pagination.dto";
import { QuickAccessInvoicePaginationEntity } from "../../domain/entities/invoice/quickAccessInvoice.entity";
import QuickAccessInvoiceRepository from "../../domain/repositories/quickAccessInvoice.repository";

export default class QuickAccessInvoiceRepositoryImpl implements QuickAccessInvoiceRepository {
    constructor (
        private readonly quickAccessInvoiceDatasource: QuickAccessInvoiceDatasource
    ) {}

    getQuickAccessInvoicesByPagination(pagination:PaginationDto): Promise<QuickAccessInvoicePaginationEntity> {
        return this.quickAccessInvoiceDatasource.getQuickAccessInvoicesByPagination(pagination)
    }
}