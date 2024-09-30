import RegisterSriConfigurationIvaDto from "../../../../domain/dtos/sri/registerSriConfigurationIva.dto";
import { SriConfigurationDatasourceImpl } from "../../../datasource/sri/configuration.datasource.impl";

export const IvaSeeder = [
    {
        code: "0",
        percentage: 0,
        title: '0%'
    },
    {
        code: "2",
        percentage: 12,
        title: '12%'
    },
    {
        code: "3",
        percentage: 14,
        title: '14%'
    },
    {
        code: "4",
        percentage: 15,
        title: '15%'
    },
    {
        code: "5",
        percentage: 5,
        title: '5%'
    },
    {
        code: "6",
        percentage: null,
        title: 'No Objeto de Impuesto'
    },
    {
        code: "7",
        percentage: null,
        title: 'Exento de IVA'
    },
    {
        code: "8",
        percentage: null,
        title: 'IVA diferenciado'
    },
    {
        code: "10",
        percentage: 13,
        title: '13%'
    }
];

export async function IvaSeederUp() {
    for (let i = 0; i < IvaSeeder.length; i++) {
        const iva = IvaSeeder[i];
        const [error,SriConfigurationDto] = RegisterSriConfigurationIvaDto.create(iva);
        if (error) throw new Error(error);
        await new SriConfigurationDatasourceImpl().createSriConfigurationIva(SriConfigurationDto!);
    }
}