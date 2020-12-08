const { createPool } = require("mysql")
require("dotenv").config()

const pool = createPool({
    port: process.env.PORT_DB,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10
})

module.exports = pool