import EmisionPointDataSource from "../../../domain/datasource/emisionPoint/emisionPoint.datasource";
import EmisionPointEntity from "../../../domain/entities/emisionPoint/emisionPoint.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { EmisionPointSequelize } from "../../database/models/emisionPoint/EmisionPoint";
import EstablishmentDataSourceImpl from "../establishment/establishment.datasource.impl";

export default class EmisionPointDataSourceImpl implements EmisionPointDataSource {
    async addEmisionPoint(establishmentId: number): Promise<EmisionPointEntity> {
        try {
            const establishment = await new EstablishmentDataSourceImpl().getById(establishmentId);
            if (!establishment) {
                throw CustomError.notFound("Establishment not found");
            }
            let code = "";
            const lastEmisionPoint = await this.getLastEmisionPointByEstablishmentId(establishmentId);
            if (lastEmisionPoint) {
                code = lastEmisionPoint.code;
                let codeNumber = parseInt(code) + 1;
                code = codeNumber.toString().padStart(3, '0');
            }else{
                code = "001";
            }
            
            const emisionPoint = await EmisionPointSequelize.create({
                establishment_id: establishmentId,
                code: code
            });

            return EmisionPointEntity.create(emisionPoint);
        } catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async deleteById(emisionPointId:number): Promise<EmisionPointEntity> {
        try {
            const emisionPoint = await this.getById(emisionPointId);
            console.log(emisionPoint);
            
            if (!emisionPoint) {
                throw CustomError.notFound("Emision Point not found");
            }
            await EmisionPointSequelize.destroy({
                where: {
                    id: emisionPointId
                }
            });
            return emisionPoint;
        } catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getAllByEstablishmentId(establishmentId: number): Promise<EmisionPointEntity[]> {
        try {
            const emisionPoints = await EmisionPointSequelize.findAll({
                where: {
                    establishment_id: establishmentId
                }
            });
            return emisionPoints.map(emisionPoint => EmisionPointEntity.create(emisionPoint));
        } catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getById(emisionPointId:number): Promise<EmisionPointEntity | null> {
        try {
            const emisionPoint = await EmisionPointSequelize.findByPk(emisionPointId);
            if (!emisionPoint) {
                return null;
            }
            return EmisionPointEntity.create(emisionPoint);
        } catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getLastEmisionPointByEstablishmentId(establishmentId: number): Promise<EmisionPointEntity | null> {
        try {
            const emisionPoint = await EmisionPointSequelize.findOne({
                where: {
                    establishment_id: establishmentId
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            if (!emisionPoint) {
                return null;
            }
            return EmisionPointEntity.create(emisionPoint);
        } catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}