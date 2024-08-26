import InvoiceDocumentDatasource from "../../domain/datasource/invoice/invoiceDocument.datasource";
import InvoiceDocumentDto from "../../domain/dtos/invoice/invoiceDocument.dto";
import InvoiceDocumentEntity from "../../domain/entities/invoice/invoiceDocument.entity";
import { InvoiceDocumentSequelize } from "../database/models/invoiceDocuments";
import { v4 as uuidv4 } from 'uuid';

export default class InvoiceDocumentDatasourceImpl extends InvoiceDocumentDatasource {
    async createInvoiceDocument(invoiceDocumentDto: InvoiceDocumentDto, invoiceId:number): Promise<InvoiceDocumentEntity> {
        try {
            const [invoiceDocumentDb,create] = await InvoiceDocumentSequelize.findOrCreate({
                where: {
                    invoiceId: invoiceId,
                    type: invoiceDocumentDto.type
                },
                defaults: {
                    type: invoiceDocumentDto.type,
                    url: invoiceDocumentDto.url,
                    invoiceId: invoiceId,
                    uuid: uuidv4()
                }
            })
            if(create){
                return InvoiceDocumentEntity.create(invoiceDocumentDb)
            }

            invoiceDocumentDb.type = invoiceDocumentDto.type
            invoiceDocumentDb.url = invoiceDocumentDto.url

            await invoiceDocumentDb.save()
            return InvoiceDocumentEntity.create(invoiceDocumentDb)

        } catch (error) {
            throw new Error("Method not implemented.")
        }
    }
    async createInvoiceDocuments(invoiceDocumentsDto: InvoiceDocumentDto[],invoiceId:number): Promise<InvoiceDocumentEntity[]> {
        try {
            let invoiceDocuments: InvoiceDocumentEntity[] = []
            for (let i = 0; i < invoiceDocumentsDto.length; i++) {
                const invoiceDocumentDto = invoiceDocumentsDto[i]
                invoiceDocuments.push(await this.createInvoiceDocument(invoiceDocumentDto,invoiceId))
            }
            return invoiceDocuments
        } catch (error) {
            throw new Error("Method not implemented.")
        }
    }
    async deleteInvoiceDocument(invoiceDocumentId: number): Promise<InvoiceDocumentEntity> {
        try {
            throw new Error("Method not implemented.")
        } catch (error) {
            throw new Error("Method not implemented.")
        }
    }
    async getInvoiceDocumentsByInvoiceId(invoiceId: number): Promise<InvoiceDocumentEntity[]> {
        try {
            const invoiceDocumentsDb = await InvoiceDocumentSequelize.findAll({
                where: {
                    invoiceId: invoiceId
                }
            })
            return invoiceDocumentsDb.map(invoiceDocumentDb => InvoiceDocumentEntity.create(invoiceDocumentDb))
        } catch (error) {
            throw new Error("Method not implemented.")
        }
    }
    async updateInvoiceDocument(): Promise<any> {
        try {
            throw new Error("Method not implemented.")
        } catch (error) {
            throw new Error("Method not implemented.")
        }
    }
}