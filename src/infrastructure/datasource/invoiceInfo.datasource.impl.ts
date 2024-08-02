import { v4 } from "uuid";
import InvoiceInfoDatasource from "../../domain/datasource/invoiceInfo.datasource";
import InvoiceInfoDto from "../../domain/dtos/invoice/invoiceInfo.dto";
import { InvoiceInfoSequelize } from "../database/models/invoice/InvoiceInfo";
import { InvoiceInfoEntity } from "../../domain/entities/invoice/invoiceInfo.entity";
import CompensationEntity from "../../domain/entities/invoice/compensation.entity";
import CompensationDatasourceImpl from "./compensation.datasource.impl";
import TotalWithTaxEntity from "../../domain/entities/invoice/totalWithTax.entity";
import TotalWithTaxDatasourceImpl from "./totaWithlTax.datasource.impl";
import PaymentEntity from "../../domain/entities/invoice/payment.entity";
import PaymentDatasourceImpl from "./payment.datasource.impl";

export default class InvoiceInfoDatasourceImpl extends InvoiceInfoDatasource {
    async createInvoiceInfo(): Promise<any> {
        try {
            
        } catch (error) {
            throw error
        }
    }
    async deleteInvoiceInfo(uuid: string): Promise<any> {
        try {
            
        } catch (error) {
            throw error
        }
    }
    async getInvoiceInfoByInvoiceUuid(uuid: string): Promise<any> {
        try {
            
        } catch (error) {
            throw error
        }
    }
    async getInvoiceInfoByUuid(uuid: string): Promise<any> {
        try {
            
        } catch (error) {
            throw error
        }
    }
    async getInvoiceInfoByInvoiceId(invoiceId: number): Promise<InvoiceInfoEntity | null> {
        try {
            const invoiceInfo = await InvoiceInfoSequelize.findOne({
                where:{
                    invoiceId:invoiceId
                }
            })

            if (!invoiceInfo) return null

            invoiceInfo.totalWithTaxes = await new TotalWithTaxDatasourceImpl().getTotalsWithTaxByInvoiceInfoId(invoiceInfo.id)
            invoiceInfo.compensations = await new CompensationDatasourceImpl().getCompensationsByInvoiceInfoId(invoiceInfo.id)
            invoiceInfo.payments = await new PaymentDatasourceImpl().getPaymentsByInvoiceInfoId(invoiceInfo.id)

            return InvoiceInfoEntity.create(invoiceInfo)
        } catch (error) {
            throw error
        }
    }
    async saveInvoiceInfo(invoiceInfoDto: InvoiceInfoDto, invoiceId: number): Promise<InvoiceInfoEntity> {
        try {
            const [invoiceInfoDb, create] = await InvoiceInfoSequelize.findOrCreate({
                where:{
                    invoiceId:invoiceId
                },
                defaults:{
                    uuid: v4(),
                    issueDate: invoiceInfoDto.issueDate!,
                    establishmentAddress: invoiceInfoDto.establishmentAddress!,
                    specialTaxpayer: invoiceInfoDto.specialTaxpayer!,
                    accountingObligation: invoiceInfoDto.accountingObligation!,
                    foreignTrade: invoiceInfoDto.foreignTrade!,
                    incoTermInvoice: invoiceInfoDto.incoTermInvoice!,
                    incoTermLocation: invoiceInfoDto.incoTermLocation!,
                    countryOfOrigin: invoiceInfoDto.countryOfOrigin!,
                    portOfShipment: invoiceInfoDto.portOfShipment!,
                    portOfDestination: invoiceInfoDto.portOfDestination!,
                    destinationCountry: invoiceInfoDto.destinationCountry!,
                    acquisitionCountry: invoiceInfoDto.acquisitionCountry!,
                    buyerIdentificationType: invoiceInfoDto.buyerIdentificationType!,
                    deliveryNote: invoiceInfoDto.deliveryNote!,
                    buyerBusinessName: invoiceInfoDto.buyerBusinessName!,
                    buyerIdentification: invoiceInfoDto.buyerIdentification!,
                    buyerAddress: invoiceInfoDto.buyerAddress!,
                    totalWithoutTaxes: invoiceInfoDto.totalWithoutTaxes!,
                    totalSubsidy: invoiceInfoDto.totalSubsidy!,
                    incoTermTotalWithoutTaxes: invoiceInfoDto.incoTermTotalWithoutTaxes!,
                    totalDiscount: invoiceInfoDto.totalDiscount!,
                    reimbursementDocCode: invoiceInfoDto.reimbursementDocCode!,
                    totalReimbursementInvoices: invoiceInfoDto.totalReimbursementInvoices!,
                    totalReimbursementTaxableBase: invoiceInfoDto.totalReimbursementTaxableBase!,
                    totalReimbursementTax: invoiceInfoDto.totalReimbursementTax!,
                    tip: invoiceInfoDto.tip!,
                    internationalFreight: invoiceInfoDto.internationalFreight!,
                    internationalInsurance: invoiceInfoDto.internationalInsurance!,
                    customsExpenses: invoiceInfoDto.customsExpenses!,
                    otherTransportExpenses: invoiceInfoDto.otherTransportExpenses!,
                    totalAmount: invoiceInfoDto.totalAmount!,
                    currency: invoiceInfoDto.currency!,
                    plate: invoiceInfoDto.plate!,
                    vatWithheldValue: invoiceInfoDto.vatWithheldValue!,
                    incomeTaxWithheldValue: invoiceInfoDto.incomeTaxWithheldValue!,
                    invoiceId: invoiceId
                }
            })

            let totalWithTaxes: TotalWithTaxEntity[] = []

            for (let i = 0; i < invoiceInfoDto.totalWithTaxes.length; i++) {
                const element = invoiceInfoDto.totalWithTaxes[i];
                totalWithTaxes.push(await new TotalWithTaxDatasourceImpl().saveTotalWithTax(element, invoiceInfoDb.id))
            }

            invoiceInfoDb.totalWithTaxes = totalWithTaxes

            let compesation: CompensationEntity[] = []

            for (let i = 0; i < invoiceInfoDto.compensations.length; i++) {
                const element = invoiceInfoDto.compensations[i]
                compesation.push(await new CompensationDatasourceImpl().saveCompensation(element, invoiceInfoDb.id))
            }

            invoiceInfoDb.compensations = compesation
        
            let payments: PaymentEntity[] = []

            for (let i = 0; i < invoiceInfoDto.payments.length; i++) {
                const element = invoiceInfoDto.payments[i]
                payments.push(await new PaymentDatasourceImpl().savePayment(element, invoiceInfoDb.id))
            }
            
            invoiceInfoDb.payments = payments

            if (create) {
                return InvoiceInfoEntity.create(invoiceInfoDb);
            }

            invoiceInfoDb.issueDate = invoiceInfoDto.issueDate!
            invoiceInfoDb.establishmentAddress = invoiceInfoDto.establishmentAddress!
            invoiceInfoDb.specialTaxpayer = invoiceInfoDto.specialTaxpayer!
            invoiceInfoDb.accountingObligation = invoiceInfoDto.accountingObligation!
            invoiceInfoDb.foreignTrade = invoiceInfoDto.foreignTrade!
            invoiceInfoDb.incoTermInvoice = invoiceInfoDto.incoTermInvoice!
            invoiceInfoDb.incoTermLocation = invoiceInfoDto.incoTermLocation!
            invoiceInfoDb.countryOfOrigin = invoiceInfoDto.countryOfOrigin!
            invoiceInfoDb.portOfShipment = invoiceInfoDto.portOfShipment!
            invoiceInfoDb.portOfDestination = invoiceInfoDto.portOfDestination!
            invoiceInfoDb.destinationCountry = invoiceInfoDto.destinationCountry!
            invoiceInfoDb.acquisitionCountry = invoiceInfoDto.acquisitionCountry!
            invoiceInfoDb.buyerIdentificationType = invoiceInfoDto.buyerIdentificationType!
            invoiceInfoDb.deliveryNote = invoiceInfoDto.deliveryNote!
            invoiceInfoDb.buyerBusinessName = invoiceInfoDto.buyerBusinessName!
            invoiceInfoDb.buyerIdentification = invoiceInfoDto.buyerIdentification!
            invoiceInfoDb.buyerAddress = invoiceInfoDto.buyerAddress!
            invoiceInfoDb.totalWithoutTaxes = invoiceInfoDto.totalWithoutTaxes!
            invoiceInfoDb.totalSubsidy = invoiceInfoDto.totalSubsidy!
            invoiceInfoDb.incoTermTotalWithoutTaxes = invoiceInfoDto.incoTermTotalWithoutTaxes!
            invoiceInfoDb.totalDiscount = invoiceInfoDto.totalDiscount!
            invoiceInfoDb.reimbursementDocCode = invoiceInfoDto.reimbursementDocCode!
            invoiceInfoDb.totalReimbursementInvoices = invoiceInfoDto.totalReimbursementInvoices!
            invoiceInfoDb.totalReimbursementTaxableBase = invoiceInfoDto.totalReimbursementTaxableBase!
            invoiceInfoDb.totalReimbursementTax = invoiceInfoDto.totalReimbursementTax!
            invoiceInfoDb.tip = invoiceInfoDto.tip!
            invoiceInfoDb.internationalFreight = invoiceInfoDto.internationalFreight!
            invoiceInfoDb.internationalInsurance = invoiceInfoDto.internationalInsurance!
            invoiceInfoDb.customsExpenses = invoiceInfoDto.customsExpenses!
            invoiceInfoDb.otherTransportExpenses = invoiceInfoDto.otherTransportExpenses!
            invoiceInfoDb.totalAmount = invoiceInfoDto.totalAmount!
            invoiceInfoDb.currency = invoiceInfoDto.currency!
            invoiceInfoDb.plate = invoiceInfoDto.plate!
            invoiceInfoDb.vatWithheldValue = invoiceInfoDto.vatWithheldValue!
            invoiceInfoDb.incomeTaxWithheldValue = invoiceInfoDto.incomeTaxWithheldValue!

            await invoiceInfoDb.save()
            return InvoiceInfoEntity.create(invoiceInfoDb)
        } catch (error) {
            throw error
        }
    }
    async updateInvoiceInfo(invoiceInfoDto: any): Promise<any> {
        try {
            
        } catch (error) {
            throw error
        }
    }
}