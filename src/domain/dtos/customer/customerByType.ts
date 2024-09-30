export default class CustomerByTypeDto {
    constructor(
        public type: string,
        public value: string
    ) {}

    static create(object:{[key:string]:any}): [string?, CustomerByTypeDto?] {
        const {
            type,
            value
        } = object
        if (!type) return ["type is required", undefined]
        if (!value) return ["value is required", undefined]

        if (type !== 'fullname' && type !== 'identification') return ["only 'fullname' or 'identification' allowed in type", undefined]
        
        return [
            undefined, 
            new CustomerByTypeDto(
                type,
                value
            )
        ]
    }
}