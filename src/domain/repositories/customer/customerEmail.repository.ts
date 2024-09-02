export default abstract class CustomerEmailRepository {
    abstract registerEmail(email: string, customerId: number): Promise<string>;
    abstract deleteEmailById(id: number): Promise<string>;
    abstract getEmailsByCustomerId(customerId: number): Promise<string[]>;
}