import CustomerDatasource from "../../../domain/datasource/customer/customer.datasource";
import CustomerDto from "../../../domain/dtos/customer/customer.dto";
import {CustomerEntity, CustomerPaginationEntity} from "../../../domain/entities/customer/customer.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { CustomerSequelize } from "../../database/models/customer/Customer";
import { v4 as uuidv4 } from "uuid"
import CustomerEmailDatasourceImpl from "./customerEmail.datasource.impl";
import CustomerPhoneDatasourceImpl from "./customerPhone.datasource.impl";
import CustomerEmailEntity from "../../../domain/entities/customer/customerEmail.entity";
import PaginationDto from "../../../domain/dtos/pagination.dto";
import { FindOptions, Op } from "sequelize";

export default class CustomerDatasourceImpl extends CustomerDatasource {
    async register(registerCustomerDto: CustomerDto): Promise<CustomerEntity> {
        try {
            const {
               full_name,
               emails,
               address,
               identification,
               identification_type,
               phones 
            } = registerCustomerDto;

            const [customer,created] = await CustomerSequelize.findOrCreate({
                where:{
                    identification:identification
                },
                defaults:{
                    full_name:full_name,
                    address:address,
                    identification:identification,
                    identification_type:identification_type,
                    uuid:uuidv4()
                }
            });

            const customerEmailDatasourceImpl = new CustomerEmailDatasourceImpl();
            let customerEmailsEntity: CustomerEmailEntity[] = await customerEmailDatasourceImpl.getEmailsByCustomerId(customer.id);
            
            const notNeedEmails = customerEmailsEntity.filter(email => !emails.includes(email.email));
            for (let i = 0; i < notNeedEmails.length; i++) {
                await customerEmailDatasourceImpl.deleteEmailById(notNeedEmails[i].id);
            }

            let existingEmails = await customerEmailDatasourceImpl.getEmailsByCustomerId(customer.id);
            let missingEmails = emails.filter(email => !existingEmails.map(email => email.email).includes(email));

            for (let i = 0; i < missingEmails.length; i++) {
                existingEmails.push(await customerEmailDatasourceImpl.registerEmail(missingEmails[i],customer.id));
            }

            customer.emails = existingEmails.map(email => email.email);


            let customerPhoneDatasourceImpl = new CustomerPhoneDatasourceImpl();
            let customerPhonesEntity = await customerPhoneDatasourceImpl.getPhonesByCustomerId(customer.id);

            const notNeedPhones = customerPhonesEntity.filter(phone => !phones.includes(phone.phone));
            for (let i = 0; i < notNeedPhones.length; i++) {
                await customerPhoneDatasourceImpl.deletePhonesById(notNeedPhones[i].id);
            }

            let existingPhones = await customerPhoneDatasourceImpl.getPhonesByCustomerId(customer.id);
            let missingPhones = phones.filter(phone => !existingPhones.map(phone => phone.phone).includes(phone));

            for (let i = 0; i < missingPhones.length; i++) {
                existingPhones.push(await customerPhoneDatasourceImpl.registerPhone(missingPhones[i],customer.id));
            }

            customer.phones = existingPhones.map(phone => phone.phone);

            if(created) return CustomerEntity.create(customer);

            customer.full_name = full_name;
            customer.identification = identification;
            customer.identification_type = identification_type;
            customer.address = address;
            
            await customer.save();
            return CustomerEntity.create(customer);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async deleteCustomer(id: number): Promise<CustomerEntity> {
        try {
            const customer = await CustomerSequelize.findByPk(id);
            if (!customer) throw CustomError.notFound("Customer not found");
            await customer.destroy();
            return CustomerEntity.create(customer);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getCustomerById(id: number): Promise<CustomerEntity | null> {
        try {
            const customer = await CustomerSequelize.findByPk(id);
            if (!customer) return null;
            const customerEmailDatasourceImpl = new CustomerEmailDatasourceImpl();
            const emails = await customerEmailDatasourceImpl.getEmailsByCustomerId(customer.id);
            customer.emails = emails.map(email => email.email);

            const customerPhoneDatasourceImpl = new CustomerPhoneDatasourceImpl();
            const phones = await customerPhoneDatasourceImpl.getPhonesByCustomerId(customer.id);
            customer.phones = phones.map(phone => phone.phone);

            return CustomerEntity.create(customer);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getCustomerByUuid(uuid: string): Promise<CustomerEntity | null> {
        try {
            const customer = await CustomerSequelize.findOne({
                where:{
                    uuid:uuid
                }
            });
            if (!customer) return null;
            const customerEmailDatasourceImpl = new CustomerEmailDatasourceImpl();
            const emails = await customerEmailDatasourceImpl.getEmailsByCustomerId(customer.id);
            customer.emails = emails.map(email => email.email);

            const customerPhoneDatasourceImpl = new CustomerPhoneDatasourceImpl();
            const phones = await customerPhoneDatasourceImpl.getPhonesByCustomerId(customer.id);
            customer.phones = phones.map(phone => phone.phone);

            return CustomerEntity.create(customer);
        }  catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getCustomers(): Promise<CustomerEntity[]> {
        try {
            let customers = await CustomerSequelize.findAll();
            
            for (const customer of customers) {
                const customerEmailDatasourceImpl = new CustomerEmailDatasourceImpl();
                const emails = await customerEmailDatasourceImpl.getEmailsByCustomerId(customer.id);
                customer.emails = emails.map(email => email.email);

                const customerPhoneDatasourceImpl = new CustomerPhoneDatasourceImpl();
                const phones = await customerPhoneDatasourceImpl.getPhonesByCustomerId(customer.id);
                customer.phones = phones.map(phone => phone.phone);
            }

            return customers.map(customer => CustomerEntity.create(customer));
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getCustomersByPagination(pagination: PaginationDto): Promise<CustomerPaginationEntity> {
        try{
            let offset = (pagination.page - 1) * pagination.itemsPerPage;
            let limit = pagination.itemsPerPage;
            let where = {};
            if (pagination.search && pagination.search.length > 0) {
                where = {
                    full_name:{
                        [Op.like]:`%${pagination.search}%`
                    }
                }
            }

            let order: Array<[string, 'ASC' | 'DESC']> = [];

            if(pagination.orderKey && pagination.orderType){
                order = [[pagination.orderKey,pagination.orderType]];
            }

            let options: FindOptions = {
                where: where,
                order: order
            }

            if(pagination.itemsPerPage !== -1){
                options.limit = limit;
                options.offset = offset;
            }

            let customers = await CustomerSequelize.findAll(options);

            for (const customer of customers) {
                const customerEmailDatasourceImpl = new CustomerEmailDatasourceImpl();
                const emails = await customerEmailDatasourceImpl.getEmailsByCustomerId(customer.id);
                customer.emails = emails.map(email => email.email);

                const customerPhoneDatasourceImpl = new CustomerPhoneDatasourceImpl();
                const phones = await customerPhoneDatasourceImpl.getPhonesByCustomerId(customer.id);
                customer.phones = phones.map(phone => phone.phone);
            }

            const totalItems = await this.getTotalCount();

            return CustomerPaginationEntity.create({
                customers: customers,
                totalItems: totalItems,
                totalPages: Math.ceil(totalItems / pagination.itemsPerPage)
            });
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getTotalCount(): Promise<number> {
        try {
            return await CustomerSequelize.count();
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async findCustomerByType(type: string, value: string): Promise<CustomerEntity[]> {
        try {
            let where = {};
            if (type == "fullname"){
                where = {
                    full_name:{
                        [Op.like]:`%${value}%`
                    }
                }
            }else if(type == "identification"){
                where = {
                    identification:{
                        [Op.like]:`%${value}%`
                    }
                }
            }else{
                throw CustomError.badRequest("Invalid type");
            }

            const customers = await CustomerSequelize.findAll({
                where: where
            });

            return customers.map(customer => CustomerEntity.create(customer));
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}