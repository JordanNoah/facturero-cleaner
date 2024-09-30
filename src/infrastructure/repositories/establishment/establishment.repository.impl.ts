import EstablishmentDataSource from "../../../domain/datasource/establishment/establishment.datasource";
import EstablishmentDto from "../../../domain/dtos/establishment/establishment.dto";
import PaginationDto from "../../../domain/dtos/pagination.dto";
import EstablishmentEntity, { EstablishmentPaginationEntity } from "../../../domain/entities/establishment/establishment.entity";
import EstablishmentRepository from "../../../domain/repositories/establishment/establishment.repository";

export default class EstablishmentRepositoryImpl implements EstablishmentRepository {
    constructor (
        private readonly establishmentDatasource: EstablishmentDataSource
    ){}

    register(establishmentDto: EstablishmentDto): Promise<EstablishmentEntity> {
        return this.establishmentDatasource.register(establishmentDto);
    }
    getLastEstablishmentByInstitution(institutionId: number): Promise<EstablishmentEntity | null> {
        return this.establishmentDatasource.getLastEstablishmentByInstitution(institutionId);
    }
    getById(establishmentId: number): Promise<EstablishmentEntity | null>{
        return this.establishmentDatasource.getById(establishmentId);
    }
    getAllByInstitution(): Promise<void> {
        return this.establishmentDatasource.getAllByInstitution();
    }
    deleteById(): Promise<void> {
        return this.establishmentDatasource.deleteById();
    }
    getEstablishmentsByInstitutionPagination(pagination: PaginationDto, institution_id: number): Promise<EstablishmentPaginationEntity> {
        return this.establishmentDatasource.getEstablishmentsByInstitutionPagination(pagination, institution_id);
    }
    getByUuid(uuid: string): Promise<EstablishmentEntity | null> {
        return this.establishmentDatasource.getByUuid(uuid);
    }
}