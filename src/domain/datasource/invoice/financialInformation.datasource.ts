import FinancialInformationDto from "../../dtos/invoice/financialInformation.dto";
import { FinancialInformationEntity } from "../../entities/invoice/financialInformation.entity";

export default abstract class FinancialInformationDatasource {
    abstract createFinancialInformation(): Promise<FinancialInformationEntity>;
    abstract saveFinancialInformation(FinancialInformationDto: FinancialInformationDto,invoiceId: number): Promise<FinancialInformationEntity>;
    abstract updateFinancialInformation(): Promise<any>;
    abstract deleteFinancialInformation(uuid: string): Promise<FinancialInformationEntity>;
    abstract getFinancialInformationByUuid(uuid: string): Promise<FinancialInformationEntity | null>;
    abstract getFinancialInformationByInvoiceId(invoiceId: number): Promise<FinancialInformationEntity | null>;
}