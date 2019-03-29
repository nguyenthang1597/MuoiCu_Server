const pool = require('./mysql');

function query(query){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            err && return reject(err);
            connection.query(query, (error, rows) => {
                connection.release();
                error && return reject(error);
                return resolve(rows);
            })
            connection.on('error', (error) => {
                connection.release();
                return reject(error);
            })
        })
    })
}

module.exports = query;