import CustomerDto from "../../dtos/customer/customer.dto";
import {CustomerEntity} from "../../entities/customer/customer.entity";

export default abstract class CustomerRepository {
    abstract register(registerCustomerDto: CustomerDto): Promise<CustomerEntity>;
    abstract deleteCustomer(id: number): Promise<CustomerEntity>;
    abstract getCustomerById(id: number): Promise<CustomerEntity | null>;
    abstract getCustomers(): Promise<CustomerEntity[]>;
    abstract getCustomerByUuid(uuid: string): Promise<CustomerEntity | null>;
    abstract findCustomerByType(type: string, value: string): Promise<CustomerEntity[]>;
}