import CustomerDto from "../../dtos/customer/customer.dto";
import PaginationDto from "../../dtos/pagination.dto";
import {CustomerEntity, CustomerPaginationEntity} from "../../entities/customer/customer.entity";

export default abstract class CustomerDatasource {
    abstract register(registerCustomerDto: CustomerDto): Promise<CustomerEntity>;
    abstract deleteCustomer(id: number): Promise<CustomerEntity>;
    abstract getCustomerById(id: number): Promise<CustomerEntity | null>;
    abstract getCustomers(): Promise<CustomerEntity[]>;
    abstract getCustomerByUuid(uuid: string): Promise<CustomerEntity | null>;
    abstract getCustomersByPagination(pagination:PaginationDto): Promise<CustomerPaginationEntity>;
    abstract getTotalCount(): Promise<number>;
}