import InvoiceDatasource from "../../../domain/datasource/invoice/invoice.datasource";
import InvoiceDto from "../../../domain/dtos/invoice/invoice.dto";
import PaginationDto from "../../../domain/dtos/pagination.dto";
import { InvoiceEntity } from "../../../domain/entities/invoice/invoice.entity";
import { InvoiceRepository } from "../../../domain/repositories/invoice/invoice.repository";

export class InvoiceRepositoryImpl implements InvoiceRepository {
    constructor (
        private readonly invoiceDatasource: InvoiceDatasource
    ) {}

    createInvoice(institutionId:number): Promise<InvoiceEntity> {
        return this.invoiceDatasource.createInvoice(institutionId)
    }

    saveInvoice(invoiceDto: InvoiceDto): Promise<any> {
        return this.invoiceDatasource.saveInvoice(invoiceDto)
    }

    updateInvoice(): Promise<any> {
        return this.invoiceDatasource.updateInvoice()
    }

    deleteInvoice(uuid: string): Promise<InvoiceEntity> {
        return this.invoiceDatasource.deleteInvoice(uuid)
    }

    getInvoiceByUuid(uuid:string, withIncludes:boolean): Promise<InvoiceEntity | null>{
        return this.invoiceDatasource.getInvoiceByUuid(uuid,withIncludes)
    }

    getInvoicesByPagination(paginationDto: PaginationDto): Promise<InvoiceEntity[]> {
        return this.invoiceDatasource.getInvoicesByPagination(paginationDto)
    }

    getNextInvoiceNumber(institutionId: number, establishment: string, emissionPoint: string): Promise<string> {
        return this.invoiceDatasource.getNextInvoiceNumber(institutionId, establishment, emissionPoint)
    }
}