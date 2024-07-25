import { Hono } from "hono"
import { InvoiceRoutes } from "./router/invoice/routes"

export class Routes {
    public get routes(): Hono {
        const router = new Hono()

        router.route("/invoice", new InvoiceRoutes().routes)

        return router
    }
}