import FinancialInformationDatasource from "../../../domain/datasource/invoice/financialInformation.datasource";
import FinancialInformationDto from "../../../domain/dtos/invoice/financialInformation.dto";
import { FinancialInformationEntity } from "../../../domain/entities/invoice/financialInformation.entity";
import { FinancialInformationSequelize } from "../../database/models/invoice/FinancialInformation";

export class FinancialInformationDatasourceImpl extends FinancialInformationDatasource {
    createFinancialInformation(): Promise<FinancialInformationEntity> {
        throw new Error("Method not implemented.");
    }
    async saveFinancialInformation(financialInformationDto: FinancialInformationDto, invoiceId: number): Promise<FinancialInformationEntity> {
        try {
            const [financialInformationDb,create] = await FinancialInformationSequelize.findOrCreate({
                where:{
                    invoiceId:invoiceId
                },
                defaults:{
                    environment: financialInformationDto.environment,
                    issueType: financialInformationDto.issueType,
                    businessName: financialInformationDto.businessName,
                    tradeName: financialInformationDto.tradeName,
                    taxId: financialInformationDto.taxId,
                    accessKey: financialInformationDto.accessKey,
                    docCode: financialInformationDto.docCode,
                    establishment: financialInformationDto.establishment,
                    emissionPoint: financialInformationDto.emissionPoint,
                    sequential: financialInformationDto.sequential,
                    headquartersAddress: financialInformationDto.headquartersAddress,
                    withholdingAgent: financialInformationDto.withholdingAgent,
                    rimpeTaxpayer: financialInformationDto.rimpeTaxpayer,
                    invoiceId: invoiceId
                }
            })
            if (create) {
                return FinancialInformationEntity.create(financialInformationDb);
            }
            financialInformationDb.environment = financialInformationDto.environment
            financialInformationDb.issueType = financialInformationDto.issueType
            financialInformationDb.businessName = financialInformationDto.businessName
            financialInformationDb.tradeName = financialInformationDto.tradeName
            financialInformationDb.taxId = financialInformationDto.taxId
            financialInformationDb.accessKey = financialInformationDto.accessKey
            financialInformationDb.docCode = financialInformationDto.docCode
            financialInformationDb.establishment = financialInformationDto.establishment
            financialInformationDb.emissionPoint = financialInformationDto.emissionPoint
            financialInformationDb.sequential = financialInformationDto.sequential
            financialInformationDb.headquartersAddress = financialInformationDto.headquartersAddress
            financialInformationDb.withholdingAgent = financialInformationDto.withholdingAgent
            financialInformationDb.rimpeTaxpayer = financialInformationDto.rimpeTaxpayer
            
            await financialInformationDb.save()
            return FinancialInformationEntity.create(financialInformationDb);

        } catch (error) {
            console.log(error);
            
            throw new Error("Method not implemented.");
        }
    }
    updateFinancialInformation(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteFinancialInformation(uuid: string): Promise<FinancialInformationEntity> {
        throw new Error("Method not implemented.");
    }
    getFinancialInformationByUuid(uuid: string): Promise<FinancialInformationEntity | null> {
        throw new Error("Method not implemented.");
    }
    async getFinancialInformationByInvoiceId(invoiceId: number): Promise<FinancialInformationEntity | null> {
        try {
            const financialInformation = await FinancialInformationSequelize.findOne({
                where:{
                    invoiceId: invoiceId
                }
            })
            if(!financialInformation) return null
            return FinancialInformationEntity.create(financialInformation)
        } catch (error) {
            console.log(error);
            
            throw new Error("Method not implemented.");
        }
    }
}