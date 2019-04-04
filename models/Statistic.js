const query = require('../lib/db')
const Abstract = require("../models/Abstract");
const ChamCong = require("../models/ChamCong");

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
        var mdy = praram.split('-');
        praram = new Date(mdy[2], mdy[1], mdy[0]);
        var now = new Date();
        if (now <= praram) {
            var sql = "  select exists ( select * from chamcong where DATEDIFF(ngay,?)=0 ) as kq";
            let res = await query(sql, praram);
            if (!res || res[0].kq == 0) {
                sql = " select nv.ma as manv , tc.tiencong ,? as ngay from nhanvien nv , taikhoan tk,  " +
                    " (select ct.manvsuachua,SUM(tiencong) as tiencong from chitiethoadonsuachua ct inner join hoadon hd " +
                    " on  hd.mahoadon=ct.mahoadon where hd.trangthai=1 AND DATEDIFF(hd.ngaythanhtoan,?) = 0 " +
                    " group by ct.manvsuachua ) as tc " +
                    " where nv.taikhoan= tk.username and tk.chucvu='Sửa Chữa' and tc.manvsuachua=nv.ma ";
                sql = " insert into chamcong(manv,tiencong,ngay) " + sql;
                var param = [praram, praram];
                res = await query(sql, param);
                if (res.affectedRows == 0) {
                    sql = " insert into chamcong(manv,ngay) select  nv.ma , ? as ngay from nhanvien nv , taikhoan tk where nv.taikhoan= tk.username and tk.chucvu='Sửa Chữa' ";
                    res = await query(sql, param);
                }
            }
        }
        sql = "select * from chamcong where DATEDIFF(ngay,?) =0 ";
        res = await query(sql, praram);
        return res;
    },
    addBangCong: async function (praram, data) {
        var mdy = praram.split('-');
        praram = new Date(mdy[2], mdy[1], mdy[0]);
        var now = new Date();
        if (now >= praram)
            return { error: "không thể thêm vào trước ngày" };
        let res = await Abstract.addMutil(ChamCong, data);
    },
};
