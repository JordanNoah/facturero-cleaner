export default class PaginationDto {
    constructor(
        public page: number,
        public itemsPerPage: number,
        public orderKey: string | null,
        public orderType: string | null,
        public search: string | null
    ) {}

    static create(object:{[key:string]:any}): [string?, PaginationDto?] {
        const {
            page,
            itemsPerPage,
            orderKey,
            orderType,
            search
        } = object
        if (!page) return ["page is required", undefined]
        if (!itemsPerPage) return ["itemsPerPage is required", undefined]
        
        return [
            undefined, 
            new PaginationDto(
                Number(page),
                Number(itemsPerPage),
                orderKey || null, 
                orderType || null,
                search || null
            )
        ]
    }
}