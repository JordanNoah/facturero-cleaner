import WithHoldingDto from "../../dtos/invoice/withHolding.dto";
import WithHoldingEntity from "../../entities/invoice/withHolding.entity";

export default abstract class WithHoldingRepository {
    abstract getWithHolding(): Promise<number>
    abstract updateWithHolding(): Promise<any>
    abstract deleteWithHolding(): Promise<any>
    abstract getWithHoldingByUuid(uuid:string): Promise<number | null>
    abstract getWithHoldingByInvoiceId(invoiceId: number): Promise<WithHoldingEntity[]>
    abstract createWithHoldings(): Promise<number>
    abstract saveWithHolding(withHoldingDto: WithHoldingDto, invoiceId: number): Promise<WithHoldingEntity>
}