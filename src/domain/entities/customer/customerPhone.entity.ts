import { CustomerPhoneSequelize } from "../../../infrastructure/database/models/customer/CustomerPhone";

export default class CustomerPhoneEntity {
    constructor(
        public id:number,
        public phone:string,
        public customer_id:number,
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date | null
    ){}
    static create(customerPhone:CustomerPhoneSequelize): CustomerPhoneEntity {
        const {id,phone,customer_id,createdAt,updatedAt,deletedAt} = customerPhone;
        return new CustomerPhoneEntity(
            id,
            phone,
            customer_id,
            createdAt,
            updatedAt,
            deletedAt
        );
    }
}