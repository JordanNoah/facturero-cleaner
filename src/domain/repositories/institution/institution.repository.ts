import {RegisterInstitutionDto} from "../../dtos/institution/register-institution.dto";
import {InstitutionEntity} from "../../entities/institution/institution.entity";
import {UpdateInstitutionDto} from "../../dtos/institution/update-institution.dto";

export abstract class InstitutionRepository {
    abstract register(registerInstitutionDto:RegisterInstitutionDto): Promise<InstitutionEntity>
    abstract getAll(): Promise<InstitutionEntity[]>
    abstract getByUuid(uuid: string): Promise<InstitutionEntity|null>
    abstract getById(id: number): Promise<InstitutionEntity|null>
}