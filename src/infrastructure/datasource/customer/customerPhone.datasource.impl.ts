import CustomerPhoneDatasource from "../../../domain/datasource/customer/customerPhone.datasource";
import CustomerPhoneEntity from "../../../domain/entities/customer/customerPhone.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { CustomerPhoneSequelize } from "../../database/models/customer/CustomerPhone";

export default class CustomerPhoneDatasourceImpl extends CustomerPhoneDatasource {
    async deletePhonesById(id: number): Promise<CustomerPhoneEntity> {
        try {
            throw CustomError.notImplemented()
        } catch (error) {
            if  (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getPhonesByCustomerId(customerId: number): Promise<CustomerPhoneEntity[]> {
        try {
            const phones = await CustomerPhoneSequelize.findAll({
                where:{
                    customer_id:customerId
                }
            });
            return phones.map(phone => CustomerPhoneEntity.create(phone));
        } catch (error) {
            if  (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async registerPhone(phone: string, customerId: number): Promise<CustomerPhoneEntity> {
        try {
            const [phoneDb,created] = await CustomerPhoneSequelize.findOrCreate({
                where:{
                    phone:phone,
                    customer_id:customerId
                },
                defaults:{
                    phone:phone,
                    customer_id:customerId
                }
            });
            if (created) return CustomerPhoneEntity.create(phoneDb);
            phoneDb.phone = phone;
            await phoneDb.save();
            return CustomerPhoneEntity.create(phoneDb);
        } catch (error) {
            if  (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getPhoneById(id: number): Promise<CustomerPhoneEntity | null> {
        try {
            const phone = await CustomerPhoneSequelize.findByPk(id);
            if (!phone) return null;
            return CustomerPhoneEntity.create(phone);
        } catch (error) {
            if  (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}