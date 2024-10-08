import { Hono } from "hono";
import { Context } from "hono";
import { InvoiceDatasourceImpl } from "../../../infrastructure/datasource/invoice/invoice.datasource.impl";
import { InvoiceRepositoryImpl } from "../../../infrastructure/repositories/invoice/invoice.repository.impl";
import InvoiceDto from "../../../domain/dtos/invoice/invoice.dto";
import PaginationDto from "../../../domain/dtos/pagination.dto";
import QuickAccessInvoiceDatasourceImpl from "../../../infrastructure/datasource/quickAccessInvoice.datasource.impl";
import QuickAccessInvoiceRepositoryImpl from "../../../infrastructure/repositories/quickAccessInvoice.repository.impl";

export class InvoiceRoutes {
    public get routes(): Hono {
        const router = new Hono()
        const datasource = new InvoiceDatasourceImpl()
        const repository = new InvoiceRepositoryImpl(datasource)

        const quickAccessDatasource = new QuickAccessInvoiceDatasourceImpl()
        const quickAccessRepository = new QuickAccessInvoiceRepositoryImpl(quickAccessDatasource)

        router.post("/create", async (c: Context) => {
            try {                
                const invoice = await repository.createInvoice((await c.req.json()).institutionId)
                return c.json({ message: "Invoice created", invoice })
            } catch (error) {
                return c.json({ message: "Error creating invoice", error })
            }
        })

        router.get("/uuid/:uuid", async (c: Context) => {
            try {
                const uuid = c.req.param('uuid')
                return c.json(await repository.getInvoiceByUuid(uuid,true))
            } catch (error) {
                return c.json({ message: "Error finding invoice", error })
            }
        })

        router.delete("/uuid/:uuid", async (c: Context) => {
            try {
                const uuid = c.req.param('uuid')
                return c.json(await repository.deleteInvoice(uuid))
            } catch (error) {
                return c.json({ message: "Error deleting invoice", error })
            }
        })

        router.post("/save", async (c: Context) => {
            try {
                const body = await c.req.json()
                const [error,invoiceDto] = InvoiceDto.save(body)
                if(error) return c.json({ message: "Error creating invoice", error })
                const invoice = await repository.saveInvoice(invoiceDto!)
            
                return c.json(invoice)
            } catch (error) {
                return c.json({ message: "Error creating invoice", error })
            }
        })

        router.get("/getByPagination", async (c: Context) => {
            try {
                const [error, paginationDto] = PaginationDto.create(c.req.query())
                if(error) return c.json({ message: "Error finding invoices", error })
                const invoices = await quickAccessRepository.getQuickAccessInvoicesByPagination(paginationDto!)
                
                return c.json(invoices)
            } catch (error) {
                return c.json({ message: "Error finding invoices", error })
            }
        })

        router.get("/getNextInvoiceNumber", async (c: Context) => {
            try {
                const query = c.req.query()
                const institutionId = parseInt(query.institutionId)
                const establishment = query.establishment
                const emissionPoint = query.emissionPoint
                console.log(query);
                console.log(institutionId,establishment,emissionPoint);
                
                
                return c.json(await datasource.getNextInvoiceNumber(institutionId,establishment,emissionPoint))
            } catch (error) {
                return c.json({ message: "Error getting next invoice number", error })
            }
        })

        return router
    }
}