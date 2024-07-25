import InvoiceDatasource from "../../domain/datasource/invoice.datasource"
import FinancialInformationDto from "../../domain/dtos/invoice/financialInformation.dto";
import InvoiceDto from "../../domain/dtos/invoice/invoice.dto";
import { InvoiceEntity } from "../../domain/entities/invoice/invoice.entity";
import { InvoiceSequelize } from "../database/models/invoice/Invoice";
import { v4 } from "uuid"
import { FinancialInformationDatasourceImpl } from "./financialInformation.datasource.impl";
import InvoiceInfoDatasourceImpl from "./invoiceInfo.datasource.impl";
import DetailDatasourceImpl from "./detail.datasource.impl";
import DetailEntity from "../../domain/entities/invoice/detail.entity";
import ReimbursementDto from "../../domain/dtos/invoice/reimbursement.dto";
import ReimbursementEntity from "../../domain/entities/invoice/reimbursement.entity";
import { ReimbursementDatasourceImpl } from "./reimbursement.datasource.impl";
import WhitHoldingEntity from "../../domain/entities/invoice/withHolding.entity";
import { WithHoldingDataSourceImpl } from "./withHolding.datasource.impl";

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
    async getInvoiceByUuid(uuid: string): Promise<InvoiceEntity | null> {
        try {
            const invoice = await InvoiceSequelize.findOne({
                where: {
                    uuid: uuid
                }
            })
            if(!invoice) return null
            return InvoiceEntity.create(invoice)
        } catch (error) {
            console.log(error);
            
            throw new Error("Method not implemented.");
        }
    }
    async saveInvoice(invoiceDto: InvoiceDto): Promise<InvoiceEntity> {
        try {
            let invoiceEntity: InvoiceEntity;
            if(!invoiceDto.invoice) invoiceEntity = await this.createInvoice();
            else { let invoice = await this.getInvoiceByUuid(invoiceDto.invoice); if(!invoice) { invoice = await this.createInvoice() } invoiceEntity = invoice }
            
            const financialInformation = await new FinancialInformationDatasourceImpl().saveFinancialInformation(invoiceDto.financialInformationDto!, invoiceEntity.id)
            const invoiceInfo = await new InvoiceInfoDatasourceImpl().saveInvoiceInfo(invoiceDto.invoiceInfoDto!, invoiceEntity.id)
            let details: DetailEntity[] = [];

            for (let i = 0; i < invoiceDto.detailsDto.length; i++) {
                const element = invoiceDto.detailsDto[i];
                details.push(await new DetailDatasourceImpl().saveDetail(element, invoiceEntity.id))
            }

            let reimbursements: ReimbursementEntity[] = [];
            for (let i = 0; i < invoiceDto.reimbursementsDto.length; i++) {
                const element = invoiceDto.reimbursementsDto[i];
                reimbursements.push(await new ReimbursementDatasourceImpl().saveReimbursement(element, invoiceEntity.id))
            }

            let withHoldings: WhitHoldingEntity[] = [];
            for (let i = 0; i < invoiceDto.withholdingsDto.length; i++) {
                const element = invoiceDto.withholdingsDto[i];
                withHoldings.push(await new WithHoldingDataSourceImpl().saveWithHolding(element, invoiceEntity.id))
            }

            invoiceEntity.financialInformation = financialInformation
            invoiceEntity.invoiceInfo = invoiceInfo
            invoiceEntity.details = details
            invoiceEntity.reimbursements = reimbursements
            invoiceEntity.withHoldings = withHoldings
            return invoiceEntity
        } catch (error) {
            console.log(error);
            
            throw new Error("Method not implemented.");
        }
    }
    updateInvoice(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}