const query = require('../lib/db')


module.exports = {
    getBill: async function (praram) {
        var param = [];
        var sql = "select mahoadon,tongtien,ngaythanhtoan,loaihoadon from hoadon where trangthai=1 ";
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
        var sql = "select cthd.manvsuachua,SUM(cthd.tiencong) as tiencong,hd.ngaythanhtoan from  hoadon hd, chitiethoadonsuachua cthd " +
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
        if (param.manvsuachua) {

        }

        sql = sql + " GROUP BY cthd.manvsuachua,cthd.ngaythanhtoan ORDER BY hd.ngaythanhtoan ASC";
        let res = await query(sql, param);
        return res;
    },
};
