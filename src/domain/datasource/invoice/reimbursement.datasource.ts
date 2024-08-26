import ReimbursementDto from "../../dtos/invoice/reimbursement.dto";
import ReimbursementEntity from "../../entities/invoice/reimbursement.entity";

export abstract class ReimbursementDatasource {
    abstract createReimbursement(): Promise<any>
    abstract saveReimbursement(reimbursementDto:ReimbursementDto, invoiceId: number): Promise<ReimbursementEntity>
    abstract updateReimbursement(): Promise<any>
    abstract deleteReimbursement(uuid:string): Promise<any>
    abstract getReimbursementByUuid(uuid:string): Promise<any>
    abstract getReimbursementsByInvoiceId(invoiceId: number): Promise<ReimbursementEntity[]>
}