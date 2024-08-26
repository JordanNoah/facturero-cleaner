import InvoiceDatasource from "../../../domain/datasource/invoice/invoice.datasource"
import InvoiceDto from "../../../domain/dtos/invoice/invoice.dto";
import { InvoiceEntity } from "../../../domain/entities/invoice/invoice.entity";
import { InvoiceSequelize } from "../../database/models/invoice/Invoice";
import { v4 } from "uuid"
import { FinancialInformationDatasourceImpl } from "./financialInformation.datasource.impl";
import InvoiceInfoDatasourceImpl from "./invoiceInfo.datasource.impl";
import DetailDatasourceImpl from "./detail.datasource.impl";
import DetailEntity from "../../../domain/entities/invoice/detail.entity";
import ReimbursementEntity from "../../../domain/entities/invoice/reimbursement.entity";
import { ReimbursementDatasourceImpl } from "./reimbursement.datasource.impl";
import WhitHoldingEntity from "../../../domain/entities/invoice/withHolding.entity";
import { WithHoldingDataSourceImpl } from "./withHolding.datasource.impl";
import { InvoiceAdditionalDetailEntity } from "../../../domain/entities/invoice/invoiceAdditionalDetail.entity";
import { InvoiceAdditionalDetailDatasourceImpl } from "./invoiceAdditionalDetail.datasource.impl";

export class InvoiceDatasourceImpl extends InvoiceDatasource {
    async createInvoice(): Promise<InvoiceEntity> {
        try {
            const invoice = await InvoiceSequelize.create({
                uuid: v4()
            })

            return InvoiceEntity.create(invoice)
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    async deleteInvoice(uuid:string): Promise<InvoiceEntity> {
        try {
            const invoice = await this.getInvoiceByUuid(uuid)
            if(!invoice) throw new Error("Invoice not found")
            await InvoiceSequelize.destroy({
                where: {
                    uuid: invoice.uuid
                }
            })
            return invoice
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    async getInvoiceByUuid(uuid: string, withIncludes: boolean = false): Promise<InvoiceEntity | null> {
        try {
            const invoice = await InvoiceSequelize.findOne({
                where: {
                    uuid: uuid
                }
            })
            
            if(!invoice) return null

            if (withIncludes) {
                invoice.financialInformation = await new FinancialInformationDatasourceImpl().getFinancialInformationByInvoiceId(invoice.id)
                invoice.invoiceInfo = await new InvoiceInfoDatasourceImpl().getInvoiceInfoByInvoiceId(invoice.id)
                invoice.details = await new DetailDatasourceImpl().getDetailsByInvoiceId(invoice.id)
                invoice.reimbursements = await new ReimbursementDatasourceImpl().getReimbursementsByInvoiceId(invoice.id)
                invoice.withHoldings = await new WithHoldingDataSourceImpl().getWithHoldingsByInvoiceId(invoice.id)
                invoice.invoiceAdditionalDetails = await new InvoiceAdditionalDetailDatasourceImpl().getInvoiceAdditionalDetailsByInvoiceId(invoice.id)
            }
            return InvoiceEntity.getSequelize(invoice)
        } catch (error) {
            console.log(error);
            
            throw new Error("Method not implemented.");
        }
    }
    async saveInvoice(invoiceDto: InvoiceDto): Promise<InvoiceEntity> {
        try {
            let invoiceEntity: InvoiceEntity;
            if(!invoiceDto.invoice) invoiceEntity = await this.createInvoice();
            else { let invoice = await this.getInvoiceByUuid(invoiceDto.invoice, false); if(!invoice) { invoice = await this.createInvoice() } invoiceEntity = invoice }
            
            const financialInformationEntity = await new FinancialInformationDatasourceImpl().saveFinancialInformation(invoiceDto.financialInformationDto!, invoiceEntity.id!)
            const invoiceInfo = await new InvoiceInfoDatasourceImpl().saveInvoiceInfo(invoiceDto.invoiceInfoDto!, invoiceEntity.id!)

            for (let i = 0; i < invoiceDto.detailsDto.length; i++) {
                const element = invoiceDto.detailsDto[i];
                await new DetailDatasourceImpl().saveDetail(element, invoiceEntity.id!)
            }

            for (let i = 0; i < invoiceDto.reimbursementsDto.length; i++) {
                const element = invoiceDto.reimbursementsDto[i];
                await new ReimbursementDatasourceImpl().saveReimbursement(element, invoiceEntity.id!)
            }

            for (let i = 0; i < invoiceDto.withholdingsDto.length; i++) {
                const element = invoiceDto.withholdingsDto[i];
                await new WithHoldingDataSourceImpl().saveWithHolding(element, invoiceEntity.id!)
            }

            for (let i = 0; i < invoiceDto.invoiceAdditionalDetailsDto.length; i++) {
                const element = invoiceDto.invoiceAdditionalDetailsDto[i];
                await new InvoiceAdditionalDetailDatasourceImpl().saveInvoiceAdditionalDetail(element, invoiceEntity.id!)
            }

            new ExternalApiRepository().createInvoiceDocs(invoiceEntity)
            const [errorQuickAcces, quickAccessDto] = QuickAccessInvoiceDto.create({id:invoiceEntity.id, uuid:invoiceEntity.uuid, financialInformation:financialInformationEntity, invoiceInfo:invoiceInfo})
            await new QuickAccessInvoiceDatasourceImpl().saveQuickAccessInvoice(quickAccessDto!)
            return invoiceEntity
        } catch (error) {
            console.log(error);
            
            throw new Error("Method not implemented.");
        }
    }
    updateInvoice(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getInvoicesByPagination(paginationDto: PaginationDto): Promise<InvoiceEntity[]> {
        try {
            let invoices: InvoiceSequelize[] = []

            if(!paginationDto.search || paginationDto.search.length === 0) {
                invoices = await InvoiceSequelize.findAll({
                    limit: paginationDto.itemsPerPage,
                    offset: (paginationDto.page - 1) * paginationDto.itemsPerPage,
                    include:[
                        {
                            model:FinancialInformationSequelize,
                            as: 'financialInformation'
                        },
                        {
                            model:InvoiceInfoSequelize,
                            as: 'invoiceInfo'
                        }
                    ]
                })
            }else{
                invoices = await InvoiceSequelize.findAll({
                    limit: paginationDto.itemsPerPage,
                    offset: (paginationDto.page - 1) * paginationDto.itemsPerPage,
                    include: [
                        {
                            model: FinancialInformationSequelize,
                            as: 'financialInformation',
                            where: {
                                accessKey: { [Op.like]: `%${paginationDto.search}%` }
                            },
                            required: false
                        },
                        {
                            model: InvoiceInfoSequelize,
                            as: 'invoiceInfo',
                            where: {
                                [Op.or]: [
                                    { buyerBusinessName: { [Op.like]: `%${paginationDto.search}%` } },
                                    { totalAmount: { [Op.like]: `%${paginationDto.search}%` } }
                                ]
                            },
                            required: false
                        }
                    ]
                });
                console.log(invoices);

            }

            return invoices.map(invoice => InvoiceEntity.pagination(invoice))
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
}