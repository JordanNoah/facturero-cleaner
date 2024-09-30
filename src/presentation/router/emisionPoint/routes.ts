import { Context, Hono } from "hono";
import EmisionPointDataSourceImpl from "../../../infrastructure/datasource/emisionPoint/emisionPoint.datasource.impl";
import EmisionPointRepositoryImpl from "../../../infrastructure/repositories/emisionPoint/emisionPoint.repository.impl";

export class EmisionPointRoutes {
    public get routes(): Hono{
        const router = new Hono()
        const datasource = new EmisionPointDataSourceImpl()
        const emisionPointRepository = new EmisionPointRepositoryImpl(datasource)

        router.post('/add', async (c:Context) =>  {
            try {                
                const establishmentId = (await c.req.raw.clone().json()).establishmentId
                const emisionPoint = await emisionPointRepository.addEmisionPoint(establishmentId)
                return c.json(emisionPoint)
            } catch (error) {
                return c.json({error})
            }
        })

        router.delete('/:id', async (c:Context) =>  {
            try {
                const emisionPoint = await emisionPointRepository.deleteById(parseInt(c.req.param('id')))
                return c.json(emisionPoint)
            } catch (error) {
                return c.json({error})
            }
        })

        return router
    }
}