export default class CustomerDto {
    constructor(
        public full_name: string,
        public address: string | null,
        public identification_type: string,
        public identification: string,
        public emails: string[],
        public phones: string[]
    ) {}

    static create(object:{[key:string]:any}): [string?, CustomerDto?] {
        const {
            fullName,
            identificationType,
            identification,
            address,
            emails,
            phones
        } = object
        if (!fullName) return ["fullName is required", undefined]
        if (!identificationType) return ["identificationType is required", undefined]
        if (!identification) return ["identification is required", undefined]
        if (!emails) return ["emails is required", undefined]
        if (!phones) return ["phones is required", undefined]
        
        return [
            undefined, 
            new CustomerDto(
                fullName,
                address,
                identificationType,
                identification,
                emails,
                phones
            )
        ]
    }
}