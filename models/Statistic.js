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
        var sql = "select cthd.manvsuachua,nv.ten,SUM(cthd.tiencong) as tiencong,  CAST(hd.ngaythanhtoan AS date) as ngaythanhtoan from  hoadon hd, chitiethoadonsuachua cthd , nhanvien nv " +
            " where hd.mahoadon=cthd.mahoadon and hd.trangthai=1 AND nv.ma=cthd.manvsuachua ";

        var param = [];
        if (praram.start) {
            param.push(praram.start);
            sql = sql + " AND DATEDIFF(ngaythanhtoan,?) >= 0 ";
        }
        if (praram.end) {
            param.push(praram.end);
            sql = sql + " AND DATEDIFF(?,ngaythanhtoan) >= 0 ";
        }
        if (param.manvsuachua) {
            sql = sql + " AND nv.ma = ? ";
            param.push(praram.manvsuachua);
        }
        sql = sql + " GROUP BY cthd.manvsuachua,ngaythanhtoan ORDER BY hd.ngaythanhtoan ASC ";
        let res = await query(sql, param);
        return res;
    },
    getBangCong: async function (praram) {
        var sql = "select DATEDIFF(hd.ngaythanhtoan,cc.ngay) as test, cc.ngay, cthd.manvsuachua,SUM(cthd.tiencong) as tiencong,  CAST(hd.ngaythanhtoan AS date) as ngaythanhtoan " +
            " from  hoadon hd, chitiethoadonsuachua cthd , chamcong cc " +
            " where hd.mahoadon=cthd.mahoadon and hd.trangthai=1 AND DATEDIFF(hd.ngaythanhtoan,cc.ngay)=0 AND cc.manv=cthd.manvsuachua";

        var param = [];
        if (praram.start) {
            param.push(praram.start);
            sql = sql + " AND DATEDIFF(hd.ngaythanhtoan,?) = 0 ";
        }
        // if (praram.end) {
        //     param.push(praram.end);
        //     sql = sql + " AND DATEDIFF(?,hd.ngaythanhtoan) >= 0 ";
        // }
        if (param.manvsuachua) {
            sql = sql + "AND nv.ma = ? ";
            param.push(praram.manvsuachua);
        }
        sql = sql + " GROUP BY cthd.manvsuachua,ngaythanhtoan ORDER BY hd.ngaythanhtoan ASC ";
        console.log(sql);
        let res = await query(sql, param);
        return res;
    },
};
