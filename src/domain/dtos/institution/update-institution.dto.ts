export class UpdateInstitutionDto {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public abbreviation: string
    ) {}

    static create(object:{[key:string]:any}):[string?,UpdateInstitutionDto?] {
        const {
            id,
            uuid,
            name,
            abbreviation
        } = object
        return [
            undefined,
            new UpdateInstitutionDto(
                id,
                uuid,
                name,
                abbreviation
            )
        ]
    }
}