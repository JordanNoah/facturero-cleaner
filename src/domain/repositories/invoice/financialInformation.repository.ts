import FinancialInformationDto from "../../dtos/invoice/financialInformation.dto";
import { FinancialInformationEntity } from "../../entities/invoice/financialInformation.entity";

export abstract class FinancialInformationRepository {
    abstract createFinancialInformation(): Promise<FinancialInformationEntity>;
    abstract saveFinancialInformation(FinancialInformationDto: FinancialInformationDto): Promise<any>;
    abstract updateFinancialInformation(): Promise<any>;
    abstract deleteFinancialInformation(uuid: string): Promise<FinancialInformationEntity>;
    abstract getFinancialInformationByUuid(uuid: string): Promise<FinancialInformationEntity | null>;
}