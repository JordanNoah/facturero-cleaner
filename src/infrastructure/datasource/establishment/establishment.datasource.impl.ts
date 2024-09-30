import { FindOptions } from "sequelize";
import EstablishmentDataSource from "../../../domain/datasource/establishment/establishment.datasource";
import EstablishmentDto from "../../../domain/dtos/establishment/establishment.dto";
import PaginationDto from "../../../domain/dtos/pagination.dto";
import EstablishmentEntity, { EstablishmentPaginationEntity } from "../../../domain/entities/establishment/establishment.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { EstablishmentSequelize } from "../../database/models/establishment/Establishment";
import { v4 as uuidv4 } from "uuid"
import EmisionPointDataSourceImpl from "../emisionPoint/emisionPoint.datasource.impl";

export default class EstablishmentDataSourceImpl implements EstablishmentDataSource {
    async getByUuid(uuid: string): Promise<EstablishmentEntity | null> {
        try {
            const establishment = await EstablishmentSequelize.findOne({ where: { uuid: uuid } });
            if (!establishment) {
                return null;
            }
            establishment.emisionPoints = await new EmisionPointDataSourceImpl().getAllByEstablishmentId(establishment.id);
            console.log(EstablishmentEntity.create(establishment));
            
            return EstablishmentEntity.create(establishment);
        }  catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getTotalCountEstablishmentsByInstitution(institution_id: number): Promise<number> {
        try {
            return await EstablishmentSequelize.count({where: { institution_id: institution_id }});
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getEstablishmentsByInstitutionPagination(pagination: PaginationDto, institution_id: number): Promise<EstablishmentPaginationEntity> {
        try {

            let offset = pagination.itemsPerPage * (pagination.page - 1);
            let limit = pagination.itemsPerPage;
            let where: { [key: string]: any } = {
                institution_id: institution_id
            };
            if (pagination.search && pagination.search != "") {
                where.name = pagination.search
            }
            let order: Array<[string, 'ASC' | 'DESC']> = [];

            if (pagination.orderKey && pagination.orderType) {
                order.push([pagination.orderKey, pagination.orderType]);
            }

            let options: FindOptions = {
                where: where,
                order: order
            }

            if(pagination.itemsPerPage !== -1){
                options.limit = limit;
                options.offset = offset;
            }

            const establishments = await EstablishmentSequelize.findAll(options);

            const totalItems = await this.getTotalCountEstablishmentsByInstitution(institution_id);

            return EstablishmentPaginationEntity.create({
                establishments: establishments,
                totalItems: totalItems,
                totalPages: Math.ceil(totalItems / pagination.itemsPerPage)
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async register(establishmentDto: EstablishmentDto): Promise<EstablishmentEntity> {
        try {            
            let uuid = "";
            if (!establishmentDto.uuid) {uuid = uuidv4();}else{uuid = establishmentDto.uuid;}
            
            let code = "";
            let lastEstablishmentByInstitution = await this.getLastEstablishmentByInstitution(establishmentDto.institution_id);
            if (lastEstablishmentByInstitution) {
                code = lastEstablishmentByInstitution.code;
                let codeNumber = parseInt(code) + 1;
                code = codeNumber.toString().padStart(3, '0');
            }else{
                code = "001";
            }

            const [establishment, create] = await EstablishmentSequelize.findOrCreate({
                where: {
                    uuid: uuid,
                    institution_id: establishmentDto.institution_id
                },
                defaults: {
                    uuid: uuid,
                    name: establishmentDto.name,
                    address: establishmentDto.address,
                    institution_id: establishmentDto.institution_id,
                    code: code
                }
            })
            return EstablishmentEntity.create(establishment);
        } catch (error) {
            console.log(error)
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getLastEstablishmentByInstitution(institutionId: number): Promise<EstablishmentEntity | null> {
        try {
            const establishment = await EstablishmentSequelize.findOne({
                where: {
                    institution_id: institutionId
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            if (!establishment) {
                return null;
            }
            return EstablishmentEntity.create(establishment);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    getAllByInstitution(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getById(establishmentId: number): Promise<EstablishmentEntity | null> {
        try {
            const establishment = await EstablishmentSequelize.findByPk(establishmentId);
            if (!establishment) {
                return null;
            }
            return EstablishmentEntity.create(establishment);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    deleteById(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(establishmentDto: EstablishmentDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
}