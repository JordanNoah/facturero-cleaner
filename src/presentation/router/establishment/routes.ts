import { Context, Hono } from "hono"
import EstablishmentDataSourceImpl from "../../../infrastructure/datasource/establishment/establishment.datasource.impl"
import EstablishmentDto from "../../../domain/dtos/establishment/establishment.dto"
import EstablishmentRepositoryImpl from "../../../infrastructure/repositories/establishment/establishment.repository.impl"
import PaginationDto from "../../../domain/dtos/pagination.dto"

export class EstablishmentRoutes {
    public get routes(): Hono{
        const router = new Hono()
        const datasource = new EstablishmentDataSourceImpl()
        const establishmentRepository = new EstablishmentRepositoryImpl(datasource)

        router.post('/', async (c:Context) =>  {
            try {                
                const [error,establishmentDto] = EstablishmentDto.create(await c.req.raw.clone().json())              
                if(error) {
                    c.status(400)
                    return c.json({error})
                }
                
                const establishment = await establishmentRepository.register(establishmentDto!)
                return c.json(establishment)
            } catch (error) {
                return c.json({error})
            }
        })

        router.get('/uuid/:uuid', async (c:Context) => {
            try {
                return c.json(await establishmentRepository.getByUuid(c.req.param('uuid')))
            } catch (error) {
                return c.json({error})
            }
        })

        router.get('/getByPagination', async (c:Context) => {
            try {
                let query = c.req.query()
                const [error, pagination] = PaginationDto.create(query)
                if(error) {
                    c.status(400)
                    return c.json({error})
                }
                if(!query.institutionId) {
                    c.status(400)
                    return c.json({error: "institutionId is required"})
                }
                return c.json(await establishmentRepository.getEstablishmentsByInstitutionPagination(pagination!, parseInt(query.institutionId)))
            } catch (error) {
                return c.json({error})
            }                        
        })

        return router
    }
}