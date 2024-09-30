import EmisionPointEntity from "../emisionPoint/emisionPoint.entity";

export default class EstablishmentEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public code: string,
        public address: string | null,
        public institution_id: number,
        public emissionPoints: EmisionPointEntity[],
        public createdAt: string,
        public updatedAt: string,
        public deletedAt: string | null
    ) {}

    static create(object:{[key:string]:any}): EstablishmentEntity {
        const { id, uuid, name, code, address, institution_id, emisionPoints, createdAt, updatedAt, deletedAt } = object
                
        return new EstablishmentEntity(
            id,
            uuid,
            name,
            code,
            address,
            institution_id,
            emisionPoints,
            createdAt,
            updatedAt,
            deletedAt
        );
    }
}

export class EstablishmentPaginationEntity {
    constructor(
        public establishments:EstablishmentEntity[],
        public totalItems:number,
        public totalPages: number,
    ){}

    static create(object:{[key:string]:any}): EstablishmentPaginationEntity {
        const { establishments, totalItems, totalPages } = object

        return new EstablishmentPaginationEntity(
            establishments.map((establishment:any) => EstablishmentEntity.create(establishment)),
            totalItems,
            totalPages
        )
    }
}