import { Hono } from "hono"
import { InvoiceRoutes } from "./router/invoice/routes"
import { ProductRoutes } from "./router/product/routes"
import { InstitutionRoutes } from "./router/institution/routes"

export class Routes {
    public get routes(): Hono {
        const router = new Hono()

        router.route("/institution", new InstitutionRoutes().routes)
        router.route("/invoice", new InvoiceRoutes().routes)
        router.route("/product", new ProductRoutes().routes)
        return router
    }
}