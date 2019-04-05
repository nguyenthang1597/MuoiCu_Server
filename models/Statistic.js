const query = require('../lib/db')
const Abstract = require("../models/Abstract");
const ChamCong = require("../models/ChamCong");
const XLSX = require('xlsx');

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
    getBangCongEmployee: async function (praram) {
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

        sql = "select cc.manv,cc.vsbd,cc.vskp,cc.ngay,ct.ten, SUM(ct.tiencong) tiencong from chamcong cc ,(" + sql + ") as ct where 1=1 AND cc.manv=ct.manvsuachua ";
        if (praram.start) {
            param.push(praram.start);
            sql = sql + " AND DATEDIFF(cc.ngay,?) >= 0 ";
        }
        if (praram.end) {
            param.push(praram.end);
            sql = sql + " AND DATEDIFF(?,cc.ngay) >= 0 ";
        }
        sql = sql + " GROUP BY cc.manv, cc.ngay ORDER BY cc.ngay ASC ";
        let res = await query(sql, param);
        return res;
    },
    getBangCong: async function (praram) {
        var now = new Date();
        if (now > praram) {
            var sql = "  select exists ( select * from chamcong where DATEDIFF(ngay,?)=0 ) as kq";
            let res = await query(sql, [praram]);
            console.log(res);
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
        sql = "select cc.*,nv.ma,nv.ten from chamcong cc inner join nhanvien nv on cc.manv=nv.ma where DATEDIFF(ngay,?) =0 GROUP BY cc.ma";
        res = await query(sql, [praram]);
        return res;
    },
    addBangCong: async function (praram, data) {
        var now = new Date();
        if (now <= praram)
            return null;
        let sql = "DELETE FROM chamcong where DATEDIFF(ngay,?) =0";
        let res = await query(sql, [praram]);
        res = await Abstract.addMutil(ChamCong, data);
        return res;
    },
    getTonKhoItem: async function (praram) {
        let sql = "select ma,tentiengviet,soluongtonkho from phutung ORDER BY ma";
        let res = await query(sql);
        let i = 1;
        res = res.map(e => [i++, e.ma, e.tentiengviet, e.soluongtonkho]);
        return res;
    },
};
