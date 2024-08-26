import ReimbursementCompensationDto from "../../../dtos/invoice/reimbursement/reimbursementCompensation.dto";
import ReimbursementCompensationEntity from "../../../entities/invoice/reimbursement/reimbursementCompensation.entity";

export abstract class ReimbursementCompensationDatasource {
    abstract createReimbursementCompensation(): Promise<any>
    abstract saveReimbursementCompensation(reimbursementCompensationDto:ReimbursementCompensationDto, reimbursementId: number): Promise<ReimbursementCompensationEntity>
    abstract updateReimbursementCompensation(): Promise<any>
    abstract deleteReimbursementCompensation(uuid:string): Promise<any>
    abstract getReimbursementCompensationByUuid(uuid:string): Promise<any>
    abstract getReimbursementCompensationsByReimbursementId(reimbursementId: number): Promise<ReimbursementCompensationEntity[]>
}