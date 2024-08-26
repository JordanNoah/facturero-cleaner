import { WithHoldingDataSource } from "../../../domain/datasource/invoice/withHolding.datasource"
import WithHoldingDto from "../../../domain/dtos/invoice/withHolding.dto"
import WithHoldingEntity from "../../../domain/entities/invoice/withHolding.entity"
import WithHoldingRepository from "../../../domain/repositories/invoice/withHolding.repository"
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
    getWithHoldingByInvoiceId(invoiceId: number): Promise<WithHoldingEntity[]> {
        return this.withHoldingDataSource.getWithHoldingsByInvoiceId(invoiceId)
    }
    createWithHoldings(): Promise<number> {
        return this.withHoldingDataSource.createWithHoldings()
    }
    saveWithHolding(withHoldingDto: WithHoldingDto, invoiceId: number): Promise<WithHoldingEntity> {
        return this.withHoldingDataSource.saveWithHolding(withHoldingDto, invoiceId)
    }
    
}