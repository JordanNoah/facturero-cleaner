import { v4 } from "uuid"
import { InvoiceAdditionalDetailDatasource } from "../../../domain/datasource/invoice/invoiceAdditionalDetail.datasource";
import InvoiceAdditionalDetailDto from "../../../domain/dtos/invoice/invoiceAdditionalDetail.dto";
import { InvoiceAdditionalDetailEntity } from "../../../domain/entities/invoice/invoiceAdditionalDetail.entity";
import { InvoiceAdditionalDetailSequelize } from "../../database/models/invoice/InvoiceAdditionalDetail";

export class InvoiceAdditionalDetailDatasourceImpl extends InvoiceAdditionalDetailDatasource{
    createInvoiceAdditionalDetail(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteInvoiceAdditionalDetail(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getInvoiceAdditionalDetailsByInvoiceId(invoiceId: number): Promise<InvoiceAdditionalDetailEntity[]> {
        try {
            const invoiceAdditionalDetails = await InvoiceAdditionalDetailSequelize.findAll({
                where:{
                    invoice_id: invoiceId
                }
            })
            return invoiceAdditionalDetails.map(invoiceAdditionalDetail => InvoiceAdditionalDetailEntity.create(invoiceAdditionalDetail))
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    getInvoiceAdditionalDetailByInvoiceUuid(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getInvoiceAdditionalDetailByUuid(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async saveInvoiceAdditionalDetail(invoiceAdditionalDetailDto: InvoiceAdditionalDetailDto, invoiceId: number): Promise<InvoiceAdditionalDetailEntity> {
        try {
            let uuid: string;
            if (invoiceAdditionalDetailDto.uuid == null) {uuid = v4()} else {uuid = invoiceAdditionalDetailDto.uuid}
            const [invoiceAdditionalDetailDb, create] = await InvoiceAdditionalDetailSequelize.findOrCreate({
                where:{
                    invoice_id:invoiceId,
                    uuid: uuid
                },
                defaults:{
                    invoice_id: invoiceId,
                    uuid: uuid,
                    name: invoiceAdditionalDetailDto.name,
                    value: invoiceAdditionalDetailDto.value
                }
            })

            if(create){
                return InvoiceAdditionalDetailEntity.create(invoiceAdditionalDetailDb)
            }

            invoiceAdditionalDetailDb.name = invoiceAdditionalDetailDto.name
            invoiceAdditionalDetailDb.value = invoiceAdditionalDetailDto.value

            await invoiceAdditionalDetailDb.save()
            return InvoiceAdditionalDetailEntity.create(invoiceAdditionalDetailDb)
        } catch (error) {
            throw error
        }
    }
    updateInvoiceAdditionalDetail(invoiceAdditionalDetailDto: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}