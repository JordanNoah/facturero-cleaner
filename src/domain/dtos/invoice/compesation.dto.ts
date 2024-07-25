export default class CompensationDto {
    constructor(
        public code: number | null,
        public rate: number | null,
        public value: number | null,
    ){}

    static create(object:{[key:string]:any}): [string?, CompensationDto?] {
        const {code, rate, value} = object

        return [
            undefined,
            new CompensationDto(
                code,
                rate,
                value
            )
        ]
    }

    static save(object:{[key:string]:any}): [string?, CompensationDto?] {
        const {code, rate, value} = object

        if(!code) return ["Code is required", undefined]
        if(!rate) return ["Rate is required", undefined]
        if(!value) return ["Value is required", undefined]

        return [
            undefined,
            new CompensationDto(
                code,
                rate,
                value
            )
        ]
    }
}