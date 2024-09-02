import CustomerPhoneEntity from "../../entities/customer/customerPhone.entity";

export default abstract class CustomerPhoneDatasource {
    abstract registerPhone(phone: string, customerId: number): Promise<CustomerPhoneEntity>;
    abstract deletePhonesById(id:number): Promise<CustomerPhoneEntity>;
    abstract getPhonesByCustomerId(customerId: number): Promise<CustomerPhoneEntity[]>;
    abstract getPhoneById(id: number): Promise<CustomerPhoneEntity|null>;
}