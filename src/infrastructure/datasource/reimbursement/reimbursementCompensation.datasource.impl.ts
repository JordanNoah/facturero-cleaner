import {ReimbursementCompensationDatasource} from "../../../domain/datasource/reimbursement/reimbursementCompensation.datasource";
import ReimbursementCompensationDto from "../../../domain/dtos/invoice/reimbursement/reimbursementCompensation.dto";
import ReimbursementCompensationEntity from "../../../domain/entities/invoice/reimbursement/reimbursementCompensation.entity";
import { v4 } from "uuid"
import { ReimbursementCompensationSequelize } from "../../database/models/invoice/reimbursement/ReimbursementCompensation";
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
    async getReimbursementCompensationsByReimbursementId(reimbursementId: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async saveReimbursementCompensation(reimbursementCompensationDto: ReimbursementCompensationDto, reimbursementId: number): Promise<ReimbursementCompensationEntity> {
        try {
            let uuid: string;
            if (reimbursementCompensationDto.uuid == null) {uuid = v4()} else {uuid = reimbursementCompensationDto.uuid}
            const [reimbursementCompensationDb, create] = await ReimbursementCompensationSequelize.findOrCreate({
                where:{
                    reimbursementId: reimbursementId,
                    uuid: uuid
                },
                defaults:{
                    code: reimbursementCompensationDto.code,
                    rate: reimbursementCompensationDto.rate,
                    reimbursementId: reimbursementId,
                    uuid: uuid,
                    value: reimbursementCompensationDto.value
                }
            })
            if (create) {
                return ReimbursementCompensationEntity.create(reimbursementCompensationDb)
            }

            reimbursementCompensationDb.code = reimbursementCompensationDto.code
            reimbursementCompensationDb.rate = reimbursementCompensationDto.rate
            reimbursementCompensationDb.value = reimbursementCompensationDto.value
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