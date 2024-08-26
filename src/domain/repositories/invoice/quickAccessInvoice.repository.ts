import PaginationDto from "../../dtos/pagination.dto";
import { QuickAccessInvoicePaginationEntity } from "../../entities/invoice/quickAccessInvoice.entity";

export default abstract class QuickAccessInvoiceRepository {
    abstract getQuickAccessInvoicesByPagination(pagination:PaginationDto): Promise<QuickAccessInvoicePaginationEntity>
}