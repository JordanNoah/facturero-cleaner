import { AdditionalDetailDto } from "../dtos/invoice/additionalDetail.dto";
import AdditionalDetailEntity from "../entities/invoice/additionalDetail.entity";

export abstract class AdditionalDetailDatasource {
    abstract createAdditionalDetail(): Promise<AdditionalDetailEntity>
    abstract saveAdditionalDetail(additionalDetailDto: AdditionalDetailDto, detailId: number): Promise<AdditionalDetailEntity>
    abstract updateAdditionalDetail(): Promise<any>
    abstract deleteAdditionalDetail(uuid:string): Promise<AdditionalDetailEntity>
    abstract getAdditionalDetailByUuid(uuid:string): Promise<AdditionalDetailEntity | null>
    abstract getAdditionalDetailsByDetailId(detailId: number): Promise<AdditionalDetailEntity[]>
}