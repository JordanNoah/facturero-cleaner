import WithHoldingDto from "../dtos/invoice/withHolding.dto";
import WhitHoldingEntity from "../entities/invoice/withHolding.entity";

export abstract class WithHoldingDataSource {
    abstract getWithHolding(): Promise<number>
    abstract updateWithHolding(): Promise<any>
    abstract deleteWithHolding(): Promise<any>
    abstract getWithHoldingByUuid(uuid:string): Promise<number | null>
    abstract getWithHoldingByInvoiceId(invoiceId: number): Promise<number | null>
    abstract createWithHoldings(): Promise<number>
    abstract saveWithHolding(withHoldingDto: WithHoldingDto, invoiceId: number): Promise<WhitHoldingEntity>
}