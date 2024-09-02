import CustomerDatasource from "../../../domain/datasource/customer/customer.datasource";
import CustomerDto from "../../../domain/dtos/customer/customer.dto";
import {CustomerEntity} from "../../../domain/entities/customer/customer.entity";
import CustomerRepository from "../../../domain/repositories/customer/customer.repository";

export default class CustomerRepositoryImpl implements CustomerRepository {
    constructor (
        private readonly customerDatasource: CustomerDatasource
    ){}

    register(registerCustomerDto: CustomerDto): Promise<CustomerEntity> {
        return this.customerDatasource.register(registerCustomerDto);
    }

    deleteCustomer(id: number): Promise<CustomerEntity> {
        return this.customerDatasource.deleteCustomer(id);
    }

    getCustomers(): Promise<CustomerEntity[]> {
        return this.customerDatasource.getCustomers();
    }

    getCustomerById(id: number): Promise<CustomerEntity | null> {
        return this.customerDatasource.getCustomerById(id);
    }

    getCustomerByUuid(uuid: string): Promise<CustomerEntity | null> {
        return this.customerDatasource.getCustomerByUuid(uuid);
    }
}