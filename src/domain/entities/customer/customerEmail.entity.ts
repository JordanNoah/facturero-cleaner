import { CustomerEmailSequelize } from "../../../infrastructure/database/models/customer/CustomerEmail";

export default class CustomerEmailEntity {
    constructor(
        public id:number,
        public email:string,
        public customerId:number,
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date | null
    ){}
    static create(customerEmail:CustomerEmailSequelize): CustomerEmailEntity {
        const {id,email,customer_id,createdAt,updatedAt,deletedAt} = customerEmail;
        return new CustomerEmailEntity(
            id,
            email,
            customer_id,
            createdAt,
            updatedAt,
            deletedAt
        );
    }
}