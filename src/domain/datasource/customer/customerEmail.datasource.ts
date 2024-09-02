import CustomerEmailEntity from "../../entities/customer/customerEmail.entity";

export default abstract class CustomerEmailDatasource {
    abstract registerEmail(email: string, customerId: number): Promise<CustomerEmailEntity>;
    abstract deleteEmailById(id: number): Promise<CustomerEmailEntity>;
    abstract getEmailsByCustomerId(customerId: number): Promise<CustomerEmailEntity[]>;
    abstract getEmailById(id: number): Promise<CustomerEmailEntity | null>;
}