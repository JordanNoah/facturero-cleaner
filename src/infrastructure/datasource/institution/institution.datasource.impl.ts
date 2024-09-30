import {InstitutionDatasource} from "../../../domain/datasource/institution/institution.datasource";
import {RegisterInstitutionDto} from "../../../domain/dtos/institution/register-institution.dto";
import {InstitutionEntity} from "../../../domain/entities/institution/institution.entity";
import {CustomError} from "../../../domain/errors/custom.error";
import {InstitutionSequelize} from "../../database/models/institution/Institution";
import { v4 as uuidv4 } from "uuid"

export class InstitutionDatasourceImpl implements InstitutionDatasource {
    async register(registerInstitutionDto: RegisterInstitutionDto): Promise<InstitutionEntity> {
        try {
            const {name,abbreviation,address,hasToAccounting,ruc} = registerInstitutionDto;
            const [institution,created] = await InstitutionSequelize.findOrCreate({
                where:{
                    abbreviation:abbreviation
                },
                defaults:{
                    name:name,
                    abbreviation:abbreviation,
                    address:address,
                    uuid:uuidv4(),
                    ruc:ruc,
                    hasToAccounting:hasToAccounting
                }
            })
            return InstitutionEntity.create(institution)
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
            return InstitutionEntity.create(institution)
        }catch (error){
            console.log(error);
            
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
                const institutionEntity = InstitutionEntity.create(institutionSequelize)
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

            return InstitutionEntity.create(institutionSequelize)
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}