import InvoiceDocumentDto from "../dtos/invoice/invoiceDocument.dto";
import InvoiceDocumentEntity from "../entities/invoice/invoiceDocument.entity";

export default abstract class InvoiceDocumentRepository {
    abstract createInvoiceDocument(invoiceDocumentDto:InvoiceDocumentDto): Promise<InvoiceDocumentEntity>
    abstract createInvoiceDocuments(invoiceDocumentsDto:InvoiceDocumentDto[]): Promise<InvoiceDocumentEntity[]>
    abstract updateInvoiceDocument(): Promise<any>
    abstract deleteInvoiceDocument(invoiceDocumentId:number): Promise<InvoiceDocumentEntity>
    abstract getInvoiceDocumentsByInvoiceId(invoiceId:number): Promise<InvoiceDocumentEntity[]>
}