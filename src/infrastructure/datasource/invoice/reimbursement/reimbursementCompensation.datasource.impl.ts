import {ReimbursementCompensationDatasource} from "../../../../domain/datasource/invoice/reimbursement/reimbursementCompensation.datasource";
import ReimbursementCompensationDto from "../../../../domain/dtos/invoice/reimbursement/reimbursementCompensation.dto";
import ReimbursementCompensationEntity from "../../../../domain/entities/invoice/reimbursement/reimbursementCompensation.entity";
import { ReimbursementCompensationSequelize } from "../../../database/models/invoice/reimbursement/ReimbursementCompensation";
import { v4 } from "uuid"
export class ReimbursementCompensationDatasourceImpl extends ReimbursementCompensationDatasource {
    async createReimbursementCompensation(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async deleteReimbursementCompensation(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getReimbursementCompensationByUuid(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getReimbursementCompensationsByReimbursementId(reimbursementId: number): Promise<ReimbursementCompensationEntity[]> {
        try {
            const reimbursementCompensations = await ReimbursementCompensationSequelize.findAll({
                where:{
                    reimbursement_id: reimbursementId
                }
            })

            return reimbursementCompensations.map(reimbursementCompensation => ReimbursementCompensationEntity.create(reimbursementCompensation))
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    async saveReimbursementCompensation(reimbursementCompensationDto: ReimbursementCompensationDto, reimbursementId: number): Promise<ReimbursementCompensationEntity> {
        try {
            let uuid: string;
            if (reimbursementCompensationDto.uuid == null) {uuid = v4()} else {uuid = reimbursementCompensationDto.uuid}
            const [reimbursementCompensationDb, create] = await ReimbursementCompensationSequelize.findOrCreate({
                where:{
                    reimbursement_id: reimbursementId,
                    uuid: uuid
                },
                defaults:{
                    code: reimbursementCompensationDto.code,
                    rate: Number(reimbursementCompensationDto.rate).toPrecision(4),
                    reimbursement_id: reimbursementId,
                    uuid: uuid,
                    value: Number(reimbursementCompensationDto.value).toPrecision(4)
                }
            })
            if (create) {
                return ReimbursementCompensationEntity.create(reimbursementCompensationDb)
            }

            reimbursementCompensationDb.code = reimbursementCompensationDto.code
            reimbursementCompensationDb.rate = Number(reimbursementCompensationDto.rate).toPrecision(4)
            reimbursementCompensationDb.value = Number(reimbursementCompensationDto.value).toPrecision(4)
            await reimbursementCompensationDb.save()

            return ReimbursementCompensationEntity.create(reimbursementCompensationDb)
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    async updateReimbursementCompensation(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}