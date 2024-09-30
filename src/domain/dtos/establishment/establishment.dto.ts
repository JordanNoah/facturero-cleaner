import EmisionPointDto from "../emissionPoint/emissionPoint.dto";

export default class EstablishmentDto {
    constructor(
        public id: number | null,
        public uuid: string | null,
        public name: string,
        public address: string | null,
        public institution_id: number,
        public createdAt: string | null,
        public updatedAt: string | null,
        public deletedAt: string | null
    ) {}

    static create(object:{[key:string]:any}): [string?, EstablishmentDto?] {
        const { id, uuid, name, address, institution_id, createdAt, updatedAt, deletedAt } = object
        if (!name) return ["name is required", undefined]
        if (!institution_id) return ["institution_id is required", undefined]
        
        return [
            undefined, 
            new EstablishmentDto(
                id,
                uuid,
                name,
                address,
                institution_id,
                createdAt,
                updatedAt,
                deletedAt
            )
        ]
    }
}