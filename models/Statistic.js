const query = require('../lib/db')


module.exports = {
    getBill: async function (praram) {

        var sql = "select mahoadon,tongtien from hoadon";
        let res = await query(sql);
        return res;
    },
    getEmployee: async function (praram) {
        var sql = "select mahoadon,manv,tongtien from hoadon";
        let res = await query(sql);
        return res;
    },
};
