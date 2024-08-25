import { Op } from "sequelize";
import { QuickAccessInvoiceDatasource } from "../../domain/datasource/quickAccessInvoice.datasource";
import QuickAccessInvoiceDto from "../../domain/dtos/invoice/quickAccessInvoice.dto";
import PaginationDto from "../../domain/dtos/pagination.dto";
import {QuickAccessInvoiceEntity, QuickAccessInvoicePaginationEntity} from "../../domain/entities/invoice/quickAccessInvoice.entity";
import { QuickAccessInvoiceSequelize } from "../database/models/invoice/QuickAccessInvoice";
import { InvoiceDocumentSequelize } from "../database/models/invoiceDocuments";

export default class QuickAccessInvoiceDatasourceImpl extends QuickAccessInvoiceDatasource {
    createQuickAccessInvoice(): Promise<QuickAccessInvoiceEntity> {
        try {
            throw new Error('Method not implemented.');
        } catch (error) {
            throw new Error('Method not implemented.');
        }    
    }
    deleteQuickAccessInvoice(uuid: string): Promise<QuickAccessInvoiceEntity> {
        try {
            throw new Error('Method not implemented.');
        } catch (error) {
            throw new Error('Method not implemented.');
        }    
    }
    getQuickAccessInvoiceByUuid(uuid: string): Promise<QuickAccessInvoiceEntity | null> {
        try {
            throw new Error('Method not implemented.');
        } catch (error) {
            throw new Error('Method not implemented.');
        }    
    }
    async saveQuickAccessInvoice(quickAccessInvoiceDto: QuickAccessInvoiceDto): Promise<QuickAccessInvoiceEntity> {
        try {
            const numberInvoice = `${quickAccessInvoiceDto.financialInformation.establishment}-${quickAccessInvoiceDto.financialInformation.emissionPoint}-${quickAccessInvoiceDto.financialInformation.sequential}`
            const [quickAccessDb, created] = await QuickAccessInvoiceSequelize.findOrCreate({
                where: {
                    uuid: quickAccessInvoiceDto.uuid
                },
                defaults: {
                    uuid: quickAccessInvoiceDto.uuid,
                    environment: quickAccessInvoiceDto.financialInformation.environment,
                    issueType: quickAccessInvoiceDto.financialInformation.issueType,
                    businessName: quickAccessInvoiceDto.financialInformation.businessName,
                    tradeName: quickAccessInvoiceDto.financialInformation.tradeName,
                    taxId: quickAccessInvoiceDto.financialInformation.taxId,
                    accessKey: quickAccessInvoiceDto.financialInformation.accessKey,
                    docCode: quickAccessInvoiceDto.financialInformation.docCode,
                    establishment: quickAccessInvoiceDto.financialInformation.establishment,
                    emissionPoint: quickAccessInvoiceDto.financialInformation.emissionPoint,
                    sequential: quickAccessInvoiceDto.financialInformation.sequential,
                    headquartersAddress: quickAccessInvoiceDto.financialInformation.headquartersAddress,
                    withholdingAgent: quickAccessInvoiceDto.financialInformation.withholdingAgent,
                    rimpeTaxpayer: quickAccessInvoiceDto.financialInformation.rimpeTaxpayer,
                    numberInvoice: numberInvoice,
                    buyerBusinessName: quickAccessInvoiceDto.invoiceInfo.buyerBusinessName,
                    buyerIdentification: quickAccessInvoiceDto.invoiceInfo.buyerIdentification,
                    totalAmount: quickAccessInvoiceDto.invoiceInfo.totalAmount,
                    invoiceId: quickAccessInvoiceDto.invoiceId
                }
            })
            if(created){
                return QuickAccessInvoiceEntity.create(quickAccessDb)
            }
            quickAccessDb.uuid = quickAccessInvoiceDto.uuid
            quickAccessDb.environment = quickAccessInvoiceDto.financialInformation.environment
            quickAccessDb.issueType = quickAccessInvoiceDto.financialInformation.issueType
            quickAccessDb.businessName = quickAccessInvoiceDto.financialInformation.businessName
            quickAccessDb.tradeName = quickAccessInvoiceDto.financialInformation.tradeName
            quickAccessDb.taxId = quickAccessInvoiceDto.financialInformation.taxId
            quickAccessDb.accessKey = quickAccessInvoiceDto.financialInformation.accessKey
            quickAccessDb.docCode = quickAccessInvoiceDto.financialInformation.docCode
            quickAccessDb.establishment = quickAccessInvoiceDto.financialInformation.establishment
            quickAccessDb.emissionPoint = quickAccessInvoiceDto.financialInformation.emissionPoint
            quickAccessDb.sequential = quickAccessInvoiceDto.financialInformation.sequential
            quickAccessDb.headquartersAddress = quickAccessInvoiceDto.financialInformation.headquartersAddress
            quickAccessDb.withholdingAgent = quickAccessInvoiceDto.financialInformation.withholdingAgent
            quickAccessDb.rimpeTaxpayer = quickAccessInvoiceDto.financialInformation.rimpeTaxpayer
            quickAccessDb.numberInvoice = numberInvoice
            quickAccessDb.buyerBusinessName = quickAccessInvoiceDto.invoiceInfo.buyerBusinessName
            quickAccessDb.buyerIdentification = quickAccessInvoiceDto.invoiceInfo.buyerIdentification
            quickAccessDb.totalAmount = quickAccessInvoiceDto.invoiceInfo.totalAmount
            quickAccessDb.invoiceId = quickAccessInvoiceDto.invoiceId
            await quickAccessDb.save()

            return QuickAccessInvoiceEntity.create(quickAccessDb)
        } catch (error) {
            throw new Error('Method not implemented.');
        }    
    }
    updateQuickAccessInvoice(): Promise<any> {
        try {
            throw new Error('Method not implemented.');
        } catch (error) {
            throw new Error('Method not implemented.');
        }    
    }
    async getQuickAccessInvoicesByPagination(pagination: PaginationDto): Promise<QuickAccessInvoicePaginationEntity> {
        try {
            let quickAccessInvoices: QuickAccessInvoiceSequelize[] = []
            let where = {}
            if(pagination.search && pagination.search.length > 0){
                where = {
                    [Op.or]: [
                        { accessKey: { [Op.like]: `%${pagination.search}%` } },
                        { buyerBusinessName: { [Op.like]: `%${pagination.search}%` } },
                        { totalAmount: { [Op.like]: `%${pagination.search}%` } }
                    ]
                }
            }
            quickAccessInvoices = await QuickAccessInvoiceSequelize.findAll({
                limit: pagination.itemsPerPage,
                offset: (pagination.page - 1) * pagination.itemsPerPage,
                where: where,
                include:[{
                    model: InvoiceDocumentSequelize,
                    as: 'invoiceDocuments'
                }]
            })
            console.log(quickAccessInvoices);
            
            const totalItems = await this.getQuickAccessInvoicesCountTotal()
            return QuickAccessInvoicePaginationEntity.create({quickAccessInvoices:quickAccessInvoices, totalItems:totalItems, totalPages:Math.ceil(totalItems/pagination.itemsPerPage)})
        } catch (error) {
            console.log(error);
            
            throw new Error('Method not implemented.');
        }
    }

    async getQuickAccessInvoicesCountTotal(): Promise<number> {
        try {
            return await QuickAccessInvoiceSequelize.count()
        } catch (error) {
            throw new Error('Method not implemented.');
        } 
    }
}