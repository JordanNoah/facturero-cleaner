export default class EmisionPointDto {
    constructor(
        public id: number | null,
        public code: string,
        public establishment_id: number | null,
        public createdAt: string | null,
        public updatedAt: string | null,
        public deletedAt: string | null
    ) {}

    static create(object:{[key:string]:any}): [string?, EmisionPointDto?] {
        const { id, code, establishment_id, createdAt, updatedAt, deletedAt } = object
        if (!code) return ["code is required", undefined]
        if (!establishment_id) return ["establishment_id is required", undefined]
        
        return [
            undefined, 
            new EmisionPointDto(
                id,
                code,
                establishment_id,
                createdAt,
                updatedAt,
                deletedAt
            )
        ]
    }
}