const mysql = require('mysql');
const config = require('../config');
const pool = mysql.createPool({
    connectionLimit: config.database.limit,
    host: config.database.host,
    user: 'wxce9ubz69vjtzw8',
    password: config.database.password,
    database: config.database.database,
    port: 3306,
    dateStrings: true
})


module.exports = pool;