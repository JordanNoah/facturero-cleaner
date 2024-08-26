import { Hono } from "hono";
import { Context } from "hono";
import { InvoiceDatasourceImpl } from "../../../infrastructure/datasource/invoice/invoice.datasource.impl";
import { InvoiceRepositoryImpl } from "../../../infrastructure/repositories/invoice/invoice.repository.impl";
import InvoiceDto from "../../../domain/dtos/invoice/invoice.dto";

export class InvoiceRoutes {
    public get routes(): Hono {
        const router = new Hono()
        const datasource = new InvoiceDatasourceImpl()
        const repository = new InvoiceRepositoryImpl(datasource)

        router.post("/create", async (c: Context) => {
            try {
                const invoice = await repository.createInvoice()
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

        return router
    }
}