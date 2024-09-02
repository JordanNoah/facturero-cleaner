import { CustomerSequelize } from "../../../infrastructure/database/models/customer/Customer";

export class CustomerEntity {
    constructor(
        public id:number,
        public uuid:string,
        public fullName:string,
        public identificationType:string,
        public identification:string,
        public emails:string[],
        public phones:string[],
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date | null
    ){}
    static create(customer:CustomerSequelize): CustomerEntity {
        const {id,uuid,full_name,identification_type,identification,emails,phones,createdAt,updatedAt,deletedAt} = customer;
        return new CustomerEntity(
            id,
            uuid,
            full_name,
            identification_type,
            identification,
            emails,
            phones,
            createdAt,
            updatedAt,
            deletedAt
        );
    }
}

export class CustomerPaginationEntity {
    constructor(
        public customers:CustomerEntity[],
        public totalItems:number,
        public totalPages:number
    ){}
    static create(object:{[key:string]:any}): CustomerPaginationEntity {
        const {customers,totalItems,totalPages} = object;
        return new CustomerPaginationEntity(
            customers.map((customer:any) => CustomerEntity.create(customer)),
            totalItems,
            totalPages
        );
    }
}