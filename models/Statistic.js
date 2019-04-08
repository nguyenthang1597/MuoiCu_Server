const query = require('../lib/db')
const moment = require('moment')

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
        var param = [];
        if (praram.start) {
            param.push(praram.start);
            sql = sql + " AND DATEDIFF(ngaythanhtoan,?) >= 0 ";
        }
        if (praram.end) {
            param.push(praram.end);
            sql = sql + " AND DATEDIFF(?,ngaythanhtoan) >= 0 ";
        }
        var sql = "select nv.ma,nv.ten from nhanvien nv LEFT JOIN taikhoan tk on nv.taikhoan=tk.username where  tk.chucvu='Sửa Chữa'";
        var nv = await query(sql);
        var nhanvien = [];

        sql = "select cthd.manvsuachua as manv,CAST(hd.ngaythanhtoan as DATE) as ntt, SUM(cthd.tiencong) as tiencong  " +
            " from chitiethoadonsuachua cthd LEFT JOIN hoadon hd on cthd.mahoadon=hd.mahoadon  " +
            " WHERE DATEDIFF(hd.ngaythanhtoan,?) >=0 and DATEDIFF(hd.ngaythanhtoan,?)<=0 and hd.trangthai =1  " +
            " group by cthd.manvsuachua,ntt order by hd.ngaythanhtoan ASC";
        var tiencong = await query(sql, param);
        var currDate = moment(new Date(praram.start));
        var lastDate = moment(new Date(praram.end));
        var data = [];
        for (var cur = currDate.clone(); cur.diff(lastDate) <= 0; cur = cur.add(1, "days")) {
            var str = moment(cur).format('YYYY-MM-DD');
            var dt = nv.slice(0);
            var dsngay = tiencong.filter(e => { return e.ntt = str; })
            dt = dt.map(e => {
                var kt = dsngay.find(obj => {
                    return obj.manv === e.ma
                })
                if (!kt)
                    return e.ma, e.ten, 0, 0, 0, ''
                return e.ma, e.ten, kt.tiencong, 0, 0, '';
            })
            data.push({ ngay: str, data: dt });
        }
        return data;
        // var sql = "select cthd.manvsuachua,nv.ten,SUM(cthd.tiencong) as tiencong,  CAST(hd.ngaythanhtoan AS date) as ngaythanhtoan from  hoadon hd, chitiethoadonsuachua cthd , nhanvien nv " +
        //     " where hd.mahoadon=cthd.mahoadon and hd.trangthai=1 AND nv.ma=cthd.manvsuachua ";

        // var param = [];
        // if (praram.start) {
        //     param.push(praram.start);
        //     sql = sql + " AND DATEDIFF(ngaythanhtoan,?) >= 0 ";
        // }
        // if (praram.end) {
        //     param.push(praram.end);
        //     sql = sql + " AND DATEDIFF(?,ngaythanhtoan) >= 0 ";
        // }
        // if (param.manvsuachua) {
        //     sql = sql + " AND nv.ma = ? ";
        //     param.push(praram.manvsuachua);
        // }
        // sql = sql + " GROUP BY cthd.manvsuachua,ngaythanhtoan ORDER BY hd.ngaythanhtoan ASC ";

        // sql = "select cc.manv,cc.vsbd,cc.vskp,cc.ngay,ct.ten, SUM(ct.tiencong) tiencong from chamcong cc ,(" + sql + ") as ct where 1=1 AND cc.manv=ct.manvsuachua ";
        // if (praram.start) {
        //     param.push(praram.start);
        //     sql = sql + " AND DATEDIFF(cc.ngay,?) >= 0 ";
        // }
        // if (praram.end) {
        //     param.push(praram.end);
        //     sql = sql + " AND DATEDIFF(?,cc.ngay) >= 0 ";
        // }
        // sql = sql + " GROUP BY cc.manv, cc.ngay ORDER BY cc.ngay ASC ";
        // let res = await query(sql, param);
        // return res;
    },
    getBangCong: async function (praram) {
        var now = new Date();
        let res = {};
        if (now > praram) {
            var sql = " Insert into chamcong(manv,ngay,vskp,vsbd,ghichu)  " +
                " select ma as manv,ngay,vskp,vsbd,ghichu from ( " +
                " select nv.ma,? as ngay,0 as vskp,0 as vsbd,null  as ghichu from nhanvien nv LEFT JOIN taikhoan tk on nv.taikhoan=tk.username where  tk.chucvu='Sửa Chữa' ) nv " +
                " WHERE NOT EXISTS ( " +
                " SELECT * FROM chamcong cc WHERE DATEDIFF(cc.ngay,?) = 0 and cc.manv= nv.ma)"
            res = await query(sql, [praram, praram]);
        }
        sql = " select nvtt.manv,nvtt.ten,nvtt.ngay,nvtt.tiencong,cc.vsbd,cc.vskp,cc.ghichu from " +
            "  (select nv.ma as manv,nv.ten,IFNULL(ct.ntt,?) as ngay,IFNULL(ct.tiencong,0) as tiencong from    " +
            " (select nv.ma,nv.ten from nhanvien nv LEFT JOIN taikhoan tk on nv.taikhoan=tk.username where  tk.chucvu='Sửa Chữa' ) nv LEFT JOIN  " +
            " (select cthd.manvsuachua as manv,CAST(hd.ngaythanhtoan as DATE) as ntt, SUM(cthd.tiencong) as tiencong  " +
            " from chitiethoadonsuachua cthd LEFT JOIN hoadon hd on cthd.mahoadon=hd.mahoadon  " +
            " WHERE DATEDIFF(hd.ngaythanhtoan,?)=0 and hd.trangthai =1  " +
            " group by cthd.manvsuachua,ntt) ct " +
            " on nv.ma=ct.manv) nvtt " +
            " LEFT JOIN chamcong cc  " +
            " ON cc.manv= nvtt.manv AND DATEDIFF(nvtt.ngay,cc.ngay)=0 ";
        res = await query(sql, [praram, praram]);
        return res;
    },
    addBangCong: async function (praram, data) {
        var now = new Date();
        if (now < praram)
            return null;
        let res = await Abstract.addMutil(ChamCong, data);
        return res;
    },
    getTonKhoItem: async function (praram) {
        let sql = "select ma,tentiengviet,soluongtonkho,vitri from phutung ORDER BY ma";
        let res = await query(sql);
        let i = 1;
        res = res.map(e => [i++, e.ma, e.tentiengviet, e.soluongtonkho, e.vitri]);
        return res;
    },
};
