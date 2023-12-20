import { Sequelize } from 'sequelize'
import dotenv from "dotenv";

dotenv.config()

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER  as any
const dbPassword = process.env.DB_PASS

console.log(process.env.DB_HOST)

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver 
})

export default sequelizeConnection