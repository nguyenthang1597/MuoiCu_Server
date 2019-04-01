const query = require('../lib/db')


module.exports = {
    getBill: async function (praram) {
        var param = [];
        var sql = "select mahoadon,tongtien,ngaythanhtoan from hoadon where trangthai=1 ";
        if (praram.start) {
            param.push(praram.start);
            sql = sql + "AND DATEDIFF(ngaythanhtoan,?) >= 0 ";
        }
        if (praram.end) {
            param.push(praram.end);
            sql = sql + "AND DATEDIFF(?,ngaythanhtoan) >= 0 ";
        }
        sql = sql + " ORDER BY ngaythanhtoan ASC";
        let res = await query(sql, param);
        return res;
    },
    getEmployee: async function (praram) {
        var sql = "select hd.mahoadon,SUM(cthd.tiencong),hd.ngaythanhtoan as tiencong from  hoadon hd, chitiethoadonsuachua cthd " +
            " where hd.mahoadon=cthd.mahoadon and hd.trangthai=1 ";

        var param = [];
        if (praram.start) {
            param.push(praram.start);
            sql = sql + "AND DATEDIFF(ngaythanhtoan,?) >= 0 ";
        }
        if (praram.end) {
            param.push(praram.end);
            sql = sql + "AND DATEDIFF(?,ngaythanhtoan) >= 0 ";
        }

        sql = sql + " GROUP BY hd.mahoadon ORDER BY hd.ngaythanhtoan ASC";
        let res = await query(sql, param);
        return res;
    },
};
