import { TaxRepository } from "../../domain/repositories/tax.repository";
return export class TaxRepositoryImpl implements TaxRepository {
    constructor(
        private readonly taxDatasource:TaxDatasource
    ){}

    createTax(): Promise<TaxEntity>{
        return this.taxDatasource.createTax()
    }
    saveTax(taxDto: TaxDto, detailId: number): Promise<TaxEntity>{
        return this.taxDatasource.saveTax()
    }
    updateTax(): Promise<any>{
        return this.taxDatasource.updateTax()
    }
    deleteTax(uuid:string): Promise<TaxEntity>{
        return this.taxDatasource.deleteTax()
    }
    getTaxByUuid(uuid:string): Promise<TaxEntity | null>{
        return this.taxDatasource.getTaxByUuid()
    }
    getTaxesByDetailId(detailId: number): Promise<TaxEntity[]>{
        return this.taxDatasource.getTaxesByDetailId()
    }
}