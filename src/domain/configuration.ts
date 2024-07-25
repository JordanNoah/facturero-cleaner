require('dotenv').config()

const configuration = {
    PORT: Number(process.env.PORT) || 3000,
    // Database configuration
    DB_HOST:process.env.DB_HOST || '',
    DB_USERNAME:process.env.DB_USERNAME || '',
    DB_PASSWORD:process.env.DB_PASSWORD || '',
    DB_PORT: Number(process.env.DB_PORT) || 3306,
    DB_NAME:process.env.DB_NAME || ''
}

export default configuration