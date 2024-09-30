import SriConfigurationDatasource from "../../../domain/datasource/sri/configuration.datasource";
import RegisterSriConfigurationIvaDto from "../../../domain/dtos/sri/registerSriConfigurationIva.dto";
import { SriConfigurationIvaEntity } from "../../../domain/entities/sri/sriConfigurationIva.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { SriConfigurationIvaSequelize } from "../../database/models/sri/SriConfigurationIva";

export class SriConfigurationDatasourceImpl implements SriConfigurationDatasource {
    async createSriConfigurationIva(registerSriConfigurationDto: RegisterSriConfigurationIvaDto): Promise<SriConfigurationIvaEntity> {
        try {
            const [iva, create] = await SriConfigurationIvaSequelize.findOrCreate({
                where: {
                    code: registerSriConfigurationDto.code
                },
                defaults: {
                    code: registerSriConfigurationDto.code,
                    percentage: registerSriConfigurationDto.percentage,
                    title: registerSriConfigurationDto.title
                }
            })

            if (create) SriConfigurationIvaEntity.create(iva);

            iva.code = registerSriConfigurationDto.code;
            iva.percentage = registerSriConfigurationDto.percentage;
            iva.title = registerSriConfigurationDto.title;

            return SriConfigurationIvaEntity.create(iva);
        } catch (error) {
            console.log(error);
            
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}