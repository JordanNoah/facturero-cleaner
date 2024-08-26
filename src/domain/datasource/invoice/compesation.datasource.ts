import CompensationDto from "../../dtos/invoice/compesation.dto";
import CompensationEntity from "../../entities/invoice/compensation.entity";

export abstract class CompensationDatasource {
    abstract createCompensation(): Promise<CompensationEntity>
    abstract saveCompensation(compensationDto: CompensationDto, invoiceInfoId: number): Promise<CompensationEntity>
    abstract updateCompensation(): Promise<any>
    abstract deleteCompensation(uuid:string): Promise<CompensationEntity>
    abstract getCompensationByUuid(uuid:string): Promise<CompensationEntity | null>
    abstract getCompensationsByInvoiceInfoId(invoiceInfoId: number): Promise<CompensationEntity[]>
} 