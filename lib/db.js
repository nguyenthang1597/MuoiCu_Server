const pool = require('./mysql');

function query(query) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            console.log(connection);
            connection.query(query, (error, rows) => {
                connection.release();
                if (error) return reject(error);
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