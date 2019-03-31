const pool = require('./mysql');

function query(query, param) {
    console.log('thuc thi sql');
    console.log(query);
    console.log(param);
    console.log('ket thuc sql');
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            if (param) {
                connection.on('query', function (query) {
                    console.log(query.sql);
                });
                connection.query(query, param, (error, rows) => {
                    connection.release();
                    if (error) return reject(error);
                    return resolve(rows);
                })
            } else {
                connection.query(query, (error, rows) => {
                    connection.release();
                    if (error) return reject(error);
                    return resolve(rows);
                })
            }
            connection.on('error', (error) => {
                connection.release();
                return reject(error);
            })

        })
    })
}

module.exports = query;