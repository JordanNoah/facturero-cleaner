import {Axios} from "./axios";
import {InvoiceEntity} from "../../domain/entities/invoice/invoice.entity";
import { InvoiceDatasourceImpl } from "../datasource/invoice.datasource.impl";

export class ExternalApiRepository {
    private axios: Axios;
    
    constructor(){
        this.axios = Axios.getInstance()
    }

    createInvoiceDocs (invoiceEntity: InvoiceEntity) {
        new InvoiceDatasourceImpl().getInvoiceByUuid(invoiceEntity.uuid,true).then((invoice) => {
            if (!invoice) throw new Error("Invoice not found")
            this.axios.post('http://localhost:3000/api/docs', invoice).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })
        })
    }

}