import {Sequelize} from "sequelize";
import {config} from "./configuration"

export const sequelize = new Sequelize(config)