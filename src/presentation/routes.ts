import { Hono } from "hono"
import { InvoiceRoutes } from "./router/invoice/routes"
import { ProductRoutes } from "./router/product/routes"
import { InstitutionRoutes } from "./router/institution/routes"
import { CustomerRoutes } from "./router/customer/routes"
import { EstablishmentRoutes } from "./router/establishment/routes"
import { EmisionPointRoutes } from "./router/emisionPoint/routes"

export class Routes {
    public get routes(): Hono {
        const router = new Hono()

        router.route("/institution", new InstitutionRoutes().routes)
        router.route("/invoice", new InvoiceRoutes().routes)
        router.route("/product", new ProductRoutes().routes)
        router.route("/customer", new CustomerRoutes().routes)
        router.route("/establishment", new EstablishmentRoutes().routes)
        router.route("/emisionPoint", new EmisionPointRoutes().routes)
        return router
    }
}