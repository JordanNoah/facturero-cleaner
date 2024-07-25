import WithHoldingRepository from "../../domain/repositories/withHolding.repository"
export default class WithHoldingRepositoryImpl implements WithHoldingRepository {
    constructor(
        private readonly withHoldingDataSource:WithHoldingDataSource
    ) {}

    getWithHolding(): Promise<number> {
        return this.withHoldingDataSource.getWithHolding()
    }
    updateWithHolding(): Promise<any> {
        return this.withHoldingDataSource.updateWithHolding()
    }
    deleteWithHolding(): Promise<any> {
        return this.withHoldingDataSource.deleteWithHolding()
    }
    getWithHoldingByUuid(uuid:string): Promise<number | null> {
        return this.withHoldingDataSource.getWithHoldingByUuid(uuid)
    }
    getWithHoldingByInvoiceId(invoiceId: number): Promise<number | null> {
        return this.withHoldingDataSource.getWithHoldingByInvoiceId(invoiceId)
    }
    createWithHoldings(): Promise<number> {
        return this.withHoldingDataSource.createWithHoldings()
    }
    saveWithHolding(withHoldingDto: WithHoldingDto, invoiceId: number): Promise<WhitHoldingEntity> {
        return this.withHoldingDataSource.saveWithHolding(withHoldingDto, invoiceId)
    }
    
}