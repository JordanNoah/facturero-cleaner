import {InstitutionDatasource} from "../../../domain/datasource/institution/institution.datasource";
import {RegisterInstitutionDto} from "../../../domain/dtos/institution/register-institution.dto";
import {InstitutionEntity} from "../../../domain/entities/institution/institution.entity";
import {CustomError} from "../../../domain/errors/custom.error";
import {InstitutionSequelize} from "../../database/models/institution/Institution";
import { v4 as uuidv4 } from "uuid"

export class InstitutionDatasourceImpl implements InstitutionDatasource {
    async register(registerInstitutionDto: RegisterInstitutionDto): Promise<InstitutionEntity> {
        try {
            const {name,abbreviation} = registerInstitutionDto;
            const [institution,created] = await InstitutionSequelize.findOrCreate({
                where:{
                    abbreviation:abbreviation
                },
                defaults:{
                    name:name,
                    abbreviation:abbreviation,
                    uuid:uuidv4()
                }
            })
            return new InstitutionEntity(
                institution.id,
                institution.name,
                institution.abbreviation,
                institution.uuid,
                institution.createdAt,
                institution.updatedAt,
                institution.deletedAt
            )
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getById(id: number): Promise<InstitutionEntity | null> {
        try {
            const institution = await InstitutionSequelize.findByPk(id)
            if (!institution){
                return null
            }
            return new InstitutionEntity(institution.id,institution.uuid,institution.name,institution.abbreviation,institution.createdAt,institution.updatedAt,institution.deletedAt)
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getAll(): Promise<InstitutionEntity[]> {
        try {
            const institutions = await InstitutionSequelize.findAll();
            let institutionEntities: InstitutionEntity[] = [];
            for (let i = 0; i < institutions.length; i++) {
                const institutionSequelize = institutions[i];
                const institutionEntity = new InstitutionEntity(institutionSequelize.id,institutionSequelize.uuid,institutionSequelize.name,institutionSequelize.abbreviation,institutionSequelize.createdAt,institutionSequelize.updatedAt,institutionSequelize.deletedAt)
                institutionEntities.push(institutionEntity)
            }
            return institutionEntities
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getByUuid(uuid: string): Promise<InstitutionEntity | null> {
        try {
            const institutionSequelize = await InstitutionSequelize.findOne(
                {
                    where:{
                        uuid: uuid
                    }
                }
            )

            if (!institutionSequelize) throw CustomError.notFound(`Institution with id ${uuid} not found`)

            return new InstitutionEntity(institutionSequelize.id,institutionSequelize.uuid,institutionSequelize.name,institutionSequelize.abbreviation,institutionSequelize.createdAt,institutionSequelize.updatedAt,institutionSequelize.deletedAt)
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}