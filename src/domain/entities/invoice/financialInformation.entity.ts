export class FinancialInformationEntity {
    constructor(
        public id: number,
        public environment: number,
        public issueType: number,
        public businessName: string,
        public tradeName: string,
        public taxId: string,
        public accessKey: string,
        public docCode: string,
        public establishment: string,
        public emissionPoint: string,
        public sequential: string,
        public headquartersAddress: string,
        public withholdingAgent: string,
        public rimpeTaxpayer: string,
        public invoiceId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static create(object:{[key:string]:any}): FinancialInformationEntity {
        const { 
            id,
            environment,
            issueType,
            businessName,
            tradeName,
            taxId,
            accessKey,
            docCode,
            establishment,
            emissionPoint,
            sequential,
            headquartersAddress,
            withholdingAgent,
            rimpeTaxpayer,
            invoiceId,
            createdAt,
            updatedAt,
            deletedAt
        } = object
        return new FinancialInformationEntity(
            id,
            environment,
            issueType,
            businessName,
            tradeName,
            taxId,
            accessKey,
            docCode,
            establishment,
            emissionPoint,
            sequential,
            headquartersAddress,
            withholdingAgent,
            rimpeTaxpayer,
            invoiceId,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}