import EmisionPointDataSource from "../../../domain/datasource/emisionPoint/emisionPoint.datasource";
import EmisionPointEntity from "../../../domain/entities/emisionPoint/emisionPoint.entity";
import EmisionPointRepository from "../../../domain/repositories/emisionPoint/emisionPoint.repository";

export default class EmisionPointRepositoryImpl implements EmisionPointRepository {
    constructor(
        private readonly emisionPointDataSource: EmisionPointDataSource
    ) {}
    addEmisionPoint(establishmentId: number): Promise<EmisionPointEntity> {
        return this.emisionPointDataSource.addEmisionPoint(establishmentId);
    }
    deleteById(emisionPointId: number): Promise<EmisionPointEntity> {
        return this.emisionPointDataSource.deleteById(emisionPointId);
    }
    getAllByEstablishmentId(establishmentId:number): Promise<EmisionPointEntity[]> {
        return this.emisionPointDataSource.getAllByEstablishmentId(establishmentId);
    }
    getById(emisionPointId:number): Promise<EmisionPointEntity | null> {
        return this.emisionPointDataSource.getById(emisionPointId);
    }
    getLastEmisionPointByEstablishmentId(establishmentId: number): Promise<EmisionPointEntity | null> {
        return this.emisionPointDataSource.getLastEmisionPointByEstablishmentId(establishmentId);
    }
}