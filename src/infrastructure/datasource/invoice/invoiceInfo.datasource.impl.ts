import { v4 } from "uuid";
import InvoiceInfoDatasource from "../../../domain/datasource/invoice/invoiceInfo.datasource";
import InvoiceInfoDto from "../../../domain/dtos/invoice/invoiceInfo.dto";
import { InvoiceInfoSequelize } from "../../database/models/invoice/InvoiceInfo";
import { InvoiceInfoEntity } from "../../../domain/entities/invoice/invoiceInfo.entity";
import CompensationEntity from "../../../domain/entities/invoice/compensation.entity";
import CompensationDatasourceImpl from "./compensation.datasource.impl";
import TotalWithTaxEntity from "../../../domain/entities/invoice/totalWithTax.entity";
import TotalWithTaxDatasourceImpl from "./totaWithlTax.datasource.impl";
import PaymentEntity from "../../../domain/entities/invoice/payment.entity";
import PaymentDatasourceImpl from "./payment.datasource.impl";
import TotalWithTaxesDto from "../../../domain/dtos/invoice/totalWithTaxes.dto";

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
            const [invoiceInfoBuild, create] = await InvoiceInfoSequelize.findOrCreate({
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
                    totalWithoutTaxes: Number(invoiceInfoDto.totalWithoutTaxes!).toPrecision(4),
                    totalSubsidy: Number(invoiceInfoDto.totalSubsidy!).toPrecision(4),
                    incoTermTotalWithoutTaxes: invoiceInfoDto.incoTermTotalWithoutTaxes!,
                    totalDiscount: Number(invoiceInfoDto.totalDiscount!).toPrecision(4),
                    reimbursementDocCode: invoiceInfoDto.reimbursementDocCode!.toString(),
                    totalReimbursementInvoices: Number(invoiceInfoDto.totalReimbursementInvoices!).toPrecision(4),
                    totalReimbursementTaxableBase: Number(invoiceInfoDto.totalReimbursementTaxableBase!).toPrecision(4),
                    totalReimbursementTax: Number(invoiceInfoDto.totalReimbursementTax!).toPrecision(4),
                    tip: Number(invoiceInfoDto.tip!).toPrecision(4),
                    internationalFreight: Number(invoiceInfoDto.internationalFreight!).toPrecision(4),
                    internationalInsurance: Number(invoiceInfoDto.internationalInsurance!).toPrecision(4),
                    customsExpenses: Number(invoiceInfoDto.customsExpenses!).toPrecision(4),
                    otherTransportExpenses: Number(invoiceInfoDto.otherTransportExpenses!).toPrecision(4),
                    totalAmount: Number(invoiceInfoDto.totalAmount!).toPrecision(4),
                    currency: invoiceInfoDto.currency!,
                    plate: invoiceInfoDto.plate!,
                    vatWithheldValue: Number(invoiceInfoDto.vatWithheldValue!).toPrecision(4),
                    incomeTaxWithheldValue: Number(invoiceInfoDto.incomeTaxWithheldValue!).toPrecision(4),
                    totalTaxesCodeCero:this.getInvoiceInfoTotalTaxesByCode(2,0,invoiceInfoDto.totalWithTaxes).toPrecision(4),
                    totalTaxesCodeTwo:this.getInvoiceInfoTotalTaxesByCode(2,2,invoiceInfoDto.totalWithTaxes).toPrecision(4),
                    totalTaxesCodeThree:this.getInvoiceInfoTotalTaxesByCode(2,3,invoiceInfoDto.totalWithTaxes).toPrecision(4),
                    totalTaxesCodeFour:this.getInvoiceInfoTotalTaxesByCode(2,4,invoiceInfoDto.totalWithTaxes).toPrecision(4),
                    totalTaxesCodeFive:this.getInvoiceInfoTotalTaxesByCode(2,5,invoiceInfoDto.totalWithTaxes).toPrecision(4),
                    totalTaxesCodeSix:this.getInvoiceInfoTotalTaxesByCode(2,6,invoiceInfoDto.totalWithTaxes).toPrecision(4),
                    totalTaxesCodeSeven:this.getInvoiceInfoTotalTaxesByCode(2,7,invoiceInfoDto.totalWithTaxes).toPrecision(4),
                    totalTaxesCodeEight:this.getInvoiceInfoTotalTaxesByCode(2,8,invoiceInfoDto.totalWithTaxes).toPrecision(4),
                    totalTaxesCodeTen:this.getInvoiceInfoTotalTaxesByCode(2,10,invoiceInfoDto.totalWithTaxes).toPrecision(4),
                    totalIce: this.getInvoiceInfoTotalTaxesByCode(3,null,invoiceInfoDto.totalWithTaxes).toPrecision(4),
                    totalIrbpnr: this.getInvoiceInfoTotalTaxesByCode(5,null,invoiceInfoDto.totalWithTaxes).toPrecision(4),
                    invoiceId: invoiceId
                }
            })
            
            let totalWithTaxes: TotalWithTaxEntity[] = []

            for (let i = 0; i < invoiceInfoDto.totalWithTaxes.length; i++) {
                const element = invoiceInfoDto.totalWithTaxes[i];
                const totalWithTax = await new TotalWithTaxDatasourceImpl().saveTotalWithTax(element, invoiceInfoBuild.id)
                totalWithTaxes.push(totalWithTax)
            }
            invoiceInfoBuild.totalWithTaxes = totalWithTaxes

            let compesation: CompensationEntity[] = []

            for (let i = 0; i < invoiceInfoDto.compensations.length; i++) {
                const element = invoiceInfoDto.compensations[i]
                compesation.push(await new CompensationDatasourceImpl().saveCompensation(element, invoiceInfoBuild.id))
            }

            invoiceInfoBuild.compensations = compesation
        
            let payments: PaymentEntity[] = []

            for (let i = 0; i < invoiceInfoDto.payments.length; i++) {
                const element = invoiceInfoDto.payments[i]
                payments.push(await new PaymentDatasourceImpl().savePayment(element, invoiceInfoBuild.id))
            }
            
            invoiceInfoBuild.payments = payments

            if (create) {
                return InvoiceInfoEntity.create(invoiceInfoBuild);
            }

            invoiceInfoBuild.issueDate = invoiceInfoDto.issueDate!,
            invoiceInfoBuild.establishmentAddress = invoiceInfoDto.establishmentAddress!,
            invoiceInfoBuild.specialTaxpayer = invoiceInfoDto.specialTaxpayer!,
            invoiceInfoBuild.accountingObligation = invoiceInfoDto.accountingObligation!,
            invoiceInfoBuild.foreignTrade = invoiceInfoDto.foreignTrade!,
            invoiceInfoBuild.incoTermInvoice = invoiceInfoDto.incoTermInvoice!,
            invoiceInfoBuild.incoTermLocation = invoiceInfoDto.incoTermLocation!,
            invoiceInfoBuild.countryOfOrigin = invoiceInfoDto.countryOfOrigin!,
            invoiceInfoBuild.portOfShipment = invoiceInfoDto.portOfShipment!,
            invoiceInfoBuild.portOfDestination = invoiceInfoDto.portOfDestination!,
            invoiceInfoBuild.destinationCountry = invoiceInfoDto.destinationCountry!,
            invoiceInfoBuild.acquisitionCountry = invoiceInfoDto.acquisitionCountry!,
            invoiceInfoBuild.buyerIdentificationType = invoiceInfoDto.buyerIdentificationType!,
            invoiceInfoBuild.deliveryNote = invoiceInfoDto.deliveryNote!,
            invoiceInfoBuild.buyerBusinessName = invoiceInfoDto.buyerBusinessName!,
            invoiceInfoBuild.buyerIdentification = invoiceInfoDto.buyerIdentification!,
            invoiceInfoBuild.buyerAddress = invoiceInfoDto.buyerAddress!,
            invoiceInfoBuild.totalWithoutTaxes = (invoiceInfoDto.totalWithoutTaxes!).toPrecision(4),
            invoiceInfoBuild.totalSubsidy = (invoiceInfoDto.totalSubsidy!).toPrecision(4),
            invoiceInfoBuild.incoTermTotalWithoutTaxes = invoiceInfoDto.incoTermTotalWithoutTaxes!,
            invoiceInfoBuild.totalDiscount = (invoiceInfoDto.totalDiscount!).toPrecision(4),
            invoiceInfoBuild.reimbursementDocCode = (invoiceInfoDto.reimbursementDocCode!).toString(),
            invoiceInfoBuild.totalReimbursementInvoices = (invoiceInfoDto.totalReimbursementInvoices!).toPrecision(4),
            invoiceInfoBuild.totalReimbursementTaxableBase = (invoiceInfoDto.totalReimbursementTaxableBase!).toPrecision(4),
            invoiceInfoBuild.totalReimbursementTax = (invoiceInfoDto.totalReimbursementTax!).toPrecision(4),
            invoiceInfoBuild.tip = (invoiceInfoDto.tip!).toPrecision(4),
            invoiceInfoBuild.internationalFreight = (invoiceInfoDto.internationalFreight!).toPrecision(4),
            invoiceInfoBuild.internationalInsurance = (invoiceInfoDto.internationalInsurance!).toPrecision(4),
            invoiceInfoBuild.customsExpenses = (invoiceInfoDto.customsExpenses!).toPrecision(4),
            invoiceInfoBuild.otherTransportExpenses = (invoiceInfoDto.otherTransportExpenses!).toPrecision(4),
            invoiceInfoBuild.totalAmount = (invoiceInfoDto.totalAmount!).toPrecision(4),
            invoiceInfoBuild.currency = invoiceInfoDto.currency!,
            invoiceInfoBuild.plate = invoiceInfoDto.plate!,
            invoiceInfoBuild.vatWithheldValue = (invoiceInfoDto.vatWithheldValue!).toPrecision(4),
            invoiceInfoBuild.incomeTaxWithheldValue = (invoiceInfoDto.incomeTaxWithheldValue!).toPrecision(4),
            invoiceInfoBuild.totalTaxesCodeCero =this.getInvoiceInfoTotalTaxesByCode(2,0,invoiceInfoDto.totalWithTaxes).toPrecision(4),
            invoiceInfoBuild.totalTaxesCodeTwo =this.getInvoiceInfoTotalTaxesByCode(2,2,invoiceInfoDto.totalWithTaxes).toPrecision(4),
            invoiceInfoBuild.totalTaxesCodeThree =this.getInvoiceInfoTotalTaxesByCode(2,3,invoiceInfoDto.totalWithTaxes).toPrecision(4),
            invoiceInfoBuild.totalTaxesCodeFour =this.getInvoiceInfoTotalTaxesByCode(2,4,invoiceInfoDto.totalWithTaxes).toPrecision(4),
            invoiceInfoBuild.totalTaxesCodeFive =this.getInvoiceInfoTotalTaxesByCode(2,5,invoiceInfoDto.totalWithTaxes).toPrecision(4),
            invoiceInfoBuild.totalTaxesCodeSix =this.getInvoiceInfoTotalTaxesByCode(2,6,invoiceInfoDto.totalWithTaxes).toPrecision(4),
            invoiceInfoBuild.totalTaxesCodeSeven =this.getInvoiceInfoTotalTaxesByCode(2,7,invoiceInfoDto.totalWithTaxes).toPrecision(4),
            invoiceInfoBuild.totalTaxesCodeEight =this.getInvoiceInfoTotalTaxesByCode(2,8,invoiceInfoDto.totalWithTaxes).toPrecision(4),
            invoiceInfoBuild.totalTaxesCodeTen =this.getInvoiceInfoTotalTaxesByCode(2,10,invoiceInfoDto.totalWithTaxes).toPrecision(4),
            invoiceInfoBuild.totalIce = this.getInvoiceInfoTotalTaxesByCode(3,null,invoiceInfoDto.totalWithTaxes).toPrecision(4),
            invoiceInfoBuild.totalIrbpnr = this.getInvoiceInfoTotalTaxesByCode(5,null,invoiceInfoDto.totalWithTaxes).toPrecision(4),

            await invoiceInfoBuild.save()
            return InvoiceInfoEntity.create(invoiceInfoBuild)
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
    getInvoiceInfoTotalTaxesByCode(code: number, percentageCode:number | null, totalWithTaxes:TotalWithTaxesDto[]): number {
        try {   
            let taxes: TotalWithTaxesDto[] = []         
            if (code == 2) {
                taxes = totalWithTaxes.filter(tax => (tax.code == code && tax.percentageCode == percentageCode))
            }else{
                taxes = totalWithTaxes.filter(tax => (tax.code == code))
            }

            if (taxes.length == 0) return 0
            let total: number = 0
            for (let i = 0; i < taxes.length; i++) {
                const element = taxes[i];
                if (typeof element.value === 'number') {
                    total += element.value;
                } else {
                    total += Number(element.value!)
                }
            }
            
            return parseFloat(total.toPrecision(4))
        } catch (error) {
            throw error
        }
    }
}