import { AdditionalDetailDatasource } from "../../../domain/datasource/invoice/additionalDetail.datasource";
import { AdditionalDetailDto } from "../../../domain/dtos/invoice/additionalDetail.dto";
import AdditionalDetailEntity from "../../../domain/entities/invoice/additionalDetail.entity";
import { v4 } from "uuid"
import { AdditionalDetailSequelize } from "../../database/models/invoice/AdditionalDetail";

export default class AdditionalDetailDatasourceImpl extends AdditionalDetailDatasource {
    createAdditionalDetail(): Promise<AdditionalDetailEntity> {
        throw new Error("Method not implemented.");
    }
    deleteAdditionalDetail(uuid: string): Promise<AdditionalDetailEntity> {
        throw new Error("Method not implemented.");
    }
    getAdditionalDetailByUuid(uuid: string): Promise<AdditionalDetailEntity | null> {
        throw new Error("Method not implemented.");
    }
    async getAdditionalDetailsByDetailId(detailId: number): Promise<AdditionalDetailEntity[]> {
        try {
            const additionalDetails = await AdditionalDetailSequelize.findAll({
                where:{
                    detailId: detailId
                }
            })

            return additionalDetails.map(additionalDetail => AdditionalDetailEntity.create(additionalDetail))
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    async saveAdditionalDetail(additionalDetailDto: AdditionalDetailDto, detailId: number): Promise<AdditionalDetailEntity> {
        try {
            let uuid: string;
            if (additionalDetailDto.uuid == null) {uuid = v4()} else {uuid = additionalDetailDto.uuid}
            const [additionalDetailDb, create] = await AdditionalDetailSequelize.findOrCreate({
                where:{
                    uuid: uuid,
                    detailId: detailId
                },
                defaults:{
                    uuid: uuid,
                    name: additionalDetailDto.name,
                    value: additionalDetailDto.value,
                    detailId: detailId
                }
            })

            if(create){
                return AdditionalDetailEntity.create(additionalDetailDb)
            }

            additionalDetailDb.name = additionalDetailDto.name
            additionalDetailDb.value = additionalDetailDto.value

            await additionalDetailDb.save()
            return AdditionalDetailEntity.create(additionalDetailDb)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error("Method not implemented.");
        }
    }
    updateAdditionalDetail(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}