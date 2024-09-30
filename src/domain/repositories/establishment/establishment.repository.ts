import EstablishmentDto from "../../dtos/establishment/establishment.dto";
import PaginationDto from "../../dtos/pagination.dto";
import EstablishmentEntity, { EstablishmentPaginationEntity } from "../../entities/establishment/establishment.entity";

export default abstract class EstablishmentRepository {
    abstract register(establishmentDto: EstablishmentDto): Promise<EstablishmentEntity>
    abstract getAllByInstitution(): Promise<void>
    abstract getById(establishmentId: number): Promise<EstablishmentEntity | null>
    abstract getByUuid(uuid: string): Promise<EstablishmentEntity | null>
    abstract deleteById(): Promise<void>
    abstract getLastEstablishmentByInstitution(institutionId: number): Promise<EstablishmentEntity | null>
    abstract getEstablishmentsByInstitutionPagination(pagination: PaginationDto, institution_id: number): Promise<EstablishmentPaginationEntity>
}