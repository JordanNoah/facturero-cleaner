import EmisionPointEntity from "../../entities/emisionPoint/emisionPoint.entity";

export default abstract class EmisionPointDataSource {
    abstract addEmisionPoint(establishmentId: number): Promise<EmisionPointEntity>
    abstract getAllByEstablishmentId(establishmentId: number): Promise<EmisionPointEntity[]>
    abstract getById(emisionPointId: number): Promise<EmisionPointEntity | null>
    abstract deleteById(emisionPointId:number): Promise<EmisionPointEntity>
    abstract getLastEmisionPointByEstablishmentId(establishmentId: number): Promise<EmisionPointEntity | null>
}