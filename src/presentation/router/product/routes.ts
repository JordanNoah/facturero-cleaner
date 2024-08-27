import { Context, Hono } from "hono"
import { ProductDatasourceImpl } from "../../../infrastructure/datasource/product/product.datasource.impl"
import { ProductRepositoryImpl } from "../../../infrastructure/repositories/product/product.repository.impl"
import RegisterProductDto from "../../../domain/dtos/product/register-product.dto"
import PaginationDto from "../../../domain/dtos/pagination.dto"

export class ProductRoutes {
    constructor() {}

    public get routes(): Hono{
        const router = new Hono()
        const datasource = new ProductDatasourceImpl()
        const repository = new ProductRepositoryImpl(datasource)

        router.get('/', async (c: Context) => {
            try {
                return c.json(await repository.getProducts())
            } catch (error) {
                return c.json({ message: "Error getting products", error })
            }
        })

        router.get('/id/:id', async (c) => {
            try {
                return c.json(await repository.getProductById(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json({ message: "Error getting product", error })
            }
        })

        router.get('/uuid/:uuid', async (c) => {
            try {
                return c.json(await repository.getProductByUuid(c.req.param('uuid')))
            } catch (error) {
                return c.json({ message: "Error getting product", error })
            }
        })

        router.post('/', async (c) => {
            try {
                const [error,registerProductDto] = RegisterProductDto.create(await c.req.raw.clone().json())
                if(error) return c.json(error)
                let product = await repository.createProduct(registerProductDto!)
                return c.json(product)
            } catch (error) {
                return c.json({ message: "Error creating product", error })
            }
        })

        router.delete('/id/:id', async (c) => {
            try {
                return c.json(await repository.deleteProduct(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json({ message: "Error deleting product", error })
            }
        })

        router.get('/getByPagination', async (c) => {
            try {
                const [error, paginationDto] = PaginationDto.create(c.req.query())
                if(error) return c.json({ message: "Error finding invoices", error })
                return c.json(await repository.getProductsByPagination(paginationDto!))
            } catch (error) {
                return c.json({ message: "Error getting products", error })
            }
        })

        return router
    }
}