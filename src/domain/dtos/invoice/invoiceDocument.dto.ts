export default class InvoiceDocumentDto {
    constructor(
        public type: string,
        public url: string
    ) {}

    static create(object:{[key:string]:any}): [string?, InvoiceDocumentDto?] {
        const {
            type,
            url
        } = object
        if (!type) return ["type is required", undefined]
        if (!url) return ["url is required", undefined]
        
        return [
            undefined, 
            new InvoiceDocumentDto(
                type,
                url
            )
        ]
    }
}