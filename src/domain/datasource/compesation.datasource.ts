export abstract class CompensationDatasource {
    abstract createCompensation(): Promise<CompensationEntity>
    abstract saveCompensation(compensationDto: CompensationDto): Promise<CompensationEntity>
    abstract updateCompensation(): Promise<any>
    abstract deleteCompensation(uuid:string): Promise<CompensationEntity>
    abstract getCompensationByUuid(uuid:string): Promise<CompensationEntity | null>
    abstract getCompensationByInvoiceId(invoiceId: number): Promise<CompensationEntity | null>
} 