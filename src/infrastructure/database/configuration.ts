import {Options} from "sequelize";
import configuration from "../../domain/configuration";

export const config: Options = {
    host: configuration.DB_HOST,
    username: configuration.DB_USERNAME,
    password: configuration.DB_PASSWORD,
    logging: (msg) =>false,
    port: configuration.DB_PORT,
    database: configuration.DB_NAME,
    dialect: "mysql"
}