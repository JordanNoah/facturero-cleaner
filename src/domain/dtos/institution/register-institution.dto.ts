export class RegisterInstitutionDto {
    constructor(
        public name:string,
        public abbreviation:string,
        public ruc:string,
        public address:string,
        public hasToAccounting:boolean
    ) {}

    static create(object:{[key:string]:any}):[string?,RegisterInstitutionDto?]{
        const {
            name,
            ruc,
            address,
            hasToAccounting,
            abbreviation
        } = object

        if(!name) return ['name is required']
        if(!abbreviation) return ['abbreviation is required']
        return [
            undefined,
            new RegisterInstitutionDto(
                name,
                abbreviation,
                ruc,
                address,
                hasToAccounting
            )
        ]
    }
}