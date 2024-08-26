import { DetailDto } from "../../dtos/invoice/detail.dto";
import DetailEntity from "../../entities/invoice/detail.entity";

export abstract class DetailDatasource {
    abstract createDetail(): Promise<DetailEntity>
    abstract saveDetail(detailDto: DetailDto, invoiceId: number): Promise<DetailEntity>
    abstract updateDetail(): Promise<any>
    abstract deleteDetail(uuid:string): Promise<DetailEntity>
    abstract getDetailByUuid(uuid:string): Promise<DetailEntity | null>
    abstract getDetailsByInvoiceId(invoiceId: number): Promise<DetailEntity[]>
}