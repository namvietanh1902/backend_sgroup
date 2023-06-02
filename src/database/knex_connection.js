require('dotenv').config();
const knex = require('knex')({
    client: process.env.DB_CLIENT,
    connection: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    pool: {
        min: 1,
        max: 10
    }
});

module.exports = {
    knex
}