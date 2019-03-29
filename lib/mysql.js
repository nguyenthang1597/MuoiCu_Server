const mysql = required('mysql');
const config = require('../config');
const pool = mysql.createPool({
    connectionLimit: config.database.limit,
    host: config.database.host,
    user: config.database.user,
    password: config.data.password,
    database: config.database.database
})


module.exports = pool;