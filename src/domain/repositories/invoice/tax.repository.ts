import { TaxDto } from "../../dtos/invoice/tax.dto";
import TaxEntity from "../../entities/invoice/tax.entity";

export abstract class TaxRepository {
    abstract createTax(): Promise<TaxEntity>
    abstract saveTax(taxDto: TaxDto, detailId: number): Promise<TaxEntity>
    abstract updateTax(): Promise<any>
    abstract deleteTax(uuid:string): Promise<TaxEntity>
    abstract getTaxByUuid(uuid:string): Promise<TaxEntity | null>
    abstract getTaxesByDetailId(detailId: number): Promise<TaxEntity[]>
}