export class RegisterInstitutionDto {
    constructor(
        public name: string,
        public abbreviation: string
    ) {}

    static create(object:{[key:string]:any}):[string?,RegisterInstitutionDto?]{
        const {
            name,
            abbreviation
        } = object

        if(!name) return ['name is required']
        if(!abbreviation) return ['abbreviation is required']
        return [
            undefined,
            new RegisterInstitutionDto(
                name,
                abbreviation
            )
        ]
    }
}