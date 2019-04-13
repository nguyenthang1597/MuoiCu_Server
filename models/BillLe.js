const query = require('../lib/db')

class BillLe {
    static getNameTable() {
        return "chitiethoadonle";
    }
    static getColmun(param) {
        if (param) {
            let tmp = ['mahoadon', 'maphutung','tenphutung','dongia','soluong', 'ghichu', 'chietkhau','nhacungcap'];
            return tmp.filter(e => Object.keys(param).includes(e));
        }
        return "`mahoadon`,`maphutung`,`tenphutung`,`dongia`,`soluong`,`ghichu`,`chietkhau`,`nhacungcap`";
    }
    static getLike(k) {
        return false;
    }
    static getSelect(tb) {
        return `${tb}.maphutung,${tb}.tenphutung,${tb}.dongia,${tb}.soluong,${tb}.ghichu,${tb}.chietkhau,${tb.nhacungcap}`;
    }
    static getParam(param) {
        let tmp = ['maphutung', 'tenphutung','dongia','soluong', 'ghichu', 'chietkhau','nhacungcap'];
        let arr = Object.keys(param).filter(e => tmp.includes(e)).map(e => param[e])
        return arr;
    }
    static getArrayParam(param) {
        let tmp = ['maphutung','tenphutung','dongia', 'soluong', 'ghichu', 'chietkhau','nhacungcap'];
        let obj = {};
        let arr = Object.keys(param).filter(e => tmp.includes(e));
        arr.forEach(e => {
            obj[e] = param[e];
        });
        return obj;
    }
    static async getChitiet(param) {
        let sql = "select * from hoadon where mahoadon= ?";
        var result = [];
        var res = await query(sql, param);
        console.log(res);
        result = res[0];
        sql = "select * from chitiethoadonle ct where ct.mahoadon=?";
        res = await query(sql, param);
        result["chitiet"] = res;
        return result;
    }
    static getDuplicate() {
        return "";
    }
    static async giamSoLuongPhuTung(bill) {
        for (var i in bill) {
            var sql = " UPDATE phutung SET soluongtonkho = soluongtonkho - ? WHERE maphutung = ? ";
            var res = await query(sql,[bill[i].soluong,bill[i].maphutung]);
        }
        return {};
    }
}

module.exports = BillLe;