import CustomerEmailDatasource from "../../../domain/datasource/customer/customerEmail.datasource";
import CustomerEmailEntity from "../../../domain/entities/customer/customerEmail.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { CustomerEmailSequelize } from "../../database/models/customer/CustomerEmail";

export default class CustomerEmailDatasourceImpl extends CustomerEmailDatasource {
    async deleteEmailById(id: number): Promise<CustomerEmailEntity> {
        try {
            const email = await this.getEmailById(id);
            if (!email) throw CustomError.notFound("Email not found");
            await CustomerEmailSequelize.destroy({
                where:{
                    id:id
                }
            });
            return email;
        } catch (error) {
            if  (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getEmailsByCustomerId(customerId: number): Promise<CustomerEmailEntity[]> {
        try {
            const emails = await CustomerEmailSequelize.findAll({
                where:{
                    customer_id:customerId
                }
            });
            return emails.map(email => CustomerEmailEntity.create(email));
        } catch (error) {
            if  (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async registerEmail(email: string, customerId: number): Promise<CustomerEmailEntity> {
        try {
            const [emailDb,created] = await CustomerEmailSequelize.findOrCreate({
                where:{
                    email:email,
                    customer_id:customerId
                },
                defaults:{
                    email:email,
                    customer_id:customerId
                }
            });
            if (created) return CustomerEmailEntity.create(emailDb);
            emailDb.email = email;
            await emailDb.save();
            return CustomerEmailEntity.create(emailDb);
        } catch (error) {
            if  (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getEmailById(id: number): Promise<CustomerEmailEntity | null> {
        try {
            const email = await CustomerEmailSequelize.findByPk(id);
            if (!email) return null;
            return CustomerEmailEntity.create(email);
        } catch (error) {
            if  (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}