import {InstitutionEntity} from "../../entities/institution/institution.entity";
import {RegisterInstitutionDto} from "../../dtos/institution/register-institution.dto";

export abstract class InstitutionDatasource {
    abstract register(registerInstitutionDto:RegisterInstitutionDto): Promise<InstitutionEntity>
    abstract getAll(): Promise<InstitutionEntity[]>
    abstract getByUuid(uuid: string): Promise<InstitutionEntity|null>
    abstract getById(id: number): Promise<InstitutionEntity|null>
}