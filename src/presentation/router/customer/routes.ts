import { Context, Hono } from "hono"
import CustomerDatasourceImpl from "../../../infrastructure/datasource/customer/customer.datasource.impl"
import CustomerRepositoryImpl from "../../../infrastructure/repositories/customer/customer.repository.impl"
import CustomerDto from "../../../domain/dtos/customer/customer.dto"
import PaginationDto from "../../../domain/dtos/pagination.dto"

export class CustomerRoutes {
    constructor() {}
    public get routes(): Hono{
        const router = new Hono()
        const datasource = new CustomerDatasourceImpl()
        const customerRepository = new CustomerRepositoryImpl(datasource)

        router.post('/', async (c:Context) =>  {
            try {
                const [error,registerCustomerDto] = CustomerDto.create(await c.req.raw.clone().json())
                const customer = await customerRepository.register(registerCustomerDto!)
                if(error) return c.status(400)
                return c.json(customer)
            } catch (error) {
                return c.json({error})
            }
        })

        router.get('/', async (c:Context) => {
            try {
                return c.json(await customerRepository.getCustomers())
            } catch (error) {
                return c.json({error})
            }
        })

        router.get('/id/:id', async (c:Context) => {
            try {
                return c.json(await customerRepository.getCustomerById(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json({error})
            }
        })

        router.get('/uuid/:uuid', async (c:Context) => {
            try {
                return c.json(await customerRepository.getCustomerByUuid(c.req.param('uuid')))
            } catch (error) {
                return c.json({error})
            }
        })

        router.delete('/:id', async (c:Context) => {
            try {
                return c.json(await customerRepository.deleteCustomer(parseInt(c.req.param('id'))))
            } catch (error) {
                return c.json({error})
            }
        })

        router.get('/getByPagination', async (c:Context) => {
            try {
                const [error, paginationDto] = PaginationDto.create(c.req.query())
                if(error) return c.json({error})
                return c.json(await datasource.getCustomersByPagination(paginationDto!))
            } catch (error) {
                return c.json({error})
            }
        })
        return router
    }
}