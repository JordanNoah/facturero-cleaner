import ReimbursementCompensationEntity from "./reimbursement/reimbursementCompensation.entity"
import TaxDetailEntity from "./reimbursement/taxDetail.entity"

export default class ReimbursementEntity {
    constructor(
        public id: number,
        public uuid: string,
        public reimbursementProviderIdentificationType: number,
        public reimbursementProviderIdentification: string,
        public reimbursementProviderCountryCode: number,
        public reimbursementProviderType: number,
        public reimbursementDocCode: number,
        public reimbursementDocEstablishment: number,
        public reimbursementDocEmissionPoint: number,
        public reimbursementDocSequential: number,
        public reimbursementDocIssueDate: Date,
        public reimbursementDocAuthorizationNumber: number,
        public taxDetails: TaxDetailEntity[],
        public reimbursementCompensations: ReimbursementCompensationEntity[],
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly deletedAt: Date | null
    ) {}

    static create(object: { [key: string]: any }): ReimbursementEntity {
        const {
            id,
            uuid,
            reimbursementProviderIdentificationType,
            reimbursementProviderIdentification,
            reimbursementProviderCountryCode,
            reimbursementProviderType,
            reimbursementDocCode,
            reimbursementDocEstablishment,
            reimbursementDocEmissionPoint,
            reimbursementDocSequential,
            reimbursementDocIssueDate,
            reimbursementDocAuthorizationNumber,
            taxDetails,
            reimbursementCompensations,
            createdAt,
            updatedAt,
            deletedAt
        } = object       

        return new ReimbursementEntity(
            id,
            uuid,
            reimbursementProviderIdentificationType,
            reimbursementProviderIdentification,
            reimbursementProviderCountryCode,
            reimbursementProviderType,
            reimbursementDocCode,
            reimbursementDocEstablishment,
            reimbursementDocEmissionPoint,
            reimbursementDocSequential,
            reimbursementDocIssueDate,
            reimbursementDocAuthorizationNumber,
            taxDetails,
            reimbursementCompensations,
            createdAt,
            updatedAt,
            deletedAt ? deletedAt : null
        )
    }
}