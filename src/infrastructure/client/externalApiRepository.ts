import {Axios, AxiosResponse} from "./axios";
import {InvoiceEntity} from "../../domain/entities/invoice/invoice.entity";
import { InvoiceDatasourceImpl } from "../datasource/invoice/invoice.datasource.impl";
import InvoiceDocumentDto from "../../domain/dtos/invoice/invoiceDocument.dto";
import InvoiceDocumentDatasourceImpl from "../datasource/invoiceDocument.datasource.impl";

export class ExternalApiRepository {
    private axios: Axios;
    
    constructor(){
        this.axios = Axios.getInstance()
    }

    createInvoiceDocs (invoiceEntity: InvoiceEntity) {
        new InvoiceDatasourceImpl().getInvoiceByUuid(invoiceEntity.uuid!,true).then((invoice) => {
            if (!invoice) throw new Error("Invoice not found")
            this.axios.post('http://localhost:3031/api/doc', invoice).then(async (response) => {
                const data = (response as AxiosResponse)
                let invoiceDocumentsDto: InvoiceDocumentDto[] = []
                if (Array.isArray(data)) {
                    for (let i = 0; i < data.length; i++) {
                        const [error,invoiceDocumentDto] = InvoiceDocumentDto.create(data[i])
                        invoiceDocumentsDto.push(invoiceDocumentDto!)
                    }
                } else {
                    const [error,invoiceDocumentDto] = InvoiceDocumentDto.create(data)
                    invoiceDocumentsDto.push(invoiceDocumentDto!)
                }
                console.log(invoiceDocumentsDto);
                
                await new InvoiceDocumentDatasourceImpl().createInvoiceDocuments(invoiceDocumentsDto, invoice.id!)
            }).catch((error) => {
                console.log(error);
            })
        })
    }

}