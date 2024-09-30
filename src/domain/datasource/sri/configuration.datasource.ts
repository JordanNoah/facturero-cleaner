import RegisterSriConfigurationIvaDto from "../../dtos/sri/registerSriConfigurationIva.dto";
import { SriConfigurationIvaEntity } from "../../entities/sri/sriConfigurationIva.entity";

export default abstract class SriConfigurationDatasource {
    abstract createSriConfigurationIva(registerSriConfigurationDto: RegisterSriConfigurationIvaDto): Promise<SriConfigurationIvaEntity>;
}