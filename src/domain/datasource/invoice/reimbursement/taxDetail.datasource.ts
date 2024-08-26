import TaxDetailDto from "../../../dtos/invoice/reimbursement/taxtDetail.dto";
import TaxDetailEntity from "../../../entities/invoice/reimbursement/taxDetail.entity";

export abstract class TaxDetailDatasource {
    abstract createTaxDetail(): Promise<TaxDetailEntity>
    abstract saveTaxDetail(taxDetailDto: TaxDetailDto, reimbursementId: number): Promise<TaxDetailEntity>
    abstract updateTaxDetail(): Promise<any>
    abstract deleteTaxDetail(uuid:string): Promise<TaxDetailEntity>
    abstract getTaxDetailByUuid(uuid:string): Promise<TaxDetailEntity | null>
    abstract getTaxDetailsByReimbursementId(reimbursementId: number): Promise<TaxDetailEntity[]>
}