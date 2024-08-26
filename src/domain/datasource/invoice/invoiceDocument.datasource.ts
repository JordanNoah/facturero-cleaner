import InvoiceDocumentDto from "../../dtos/invoice/invoiceDocument.dto";
import InvoiceDocumentEntity from "../../entities/invoice/invoiceDocument.entity";

export default abstract class InvoiceDocumentDatasource {
    abstract createInvoiceDocument(invoiceDocumentDto:InvoiceDocumentDto,invoiceId:number): Promise<InvoiceDocumentEntity>
    abstract createInvoiceDocuments(invoiceDocumentsDto:InvoiceDocumentDto[],invoiceId:number): Promise<InvoiceDocumentEntity[]>
    abstract updateInvoiceDocument(): Promise<any>
    abstract deleteInvoiceDocument(invoiceDocumentId:number): Promise<InvoiceDocumentEntity>
    abstract getInvoiceDocumentsByInvoiceId(invoiceId:number): Promise<InvoiceDocumentEntity[]>
}