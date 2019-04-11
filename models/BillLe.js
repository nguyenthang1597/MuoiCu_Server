const query = require('../lib/db')

class BillLe {
    static getNameTable() {
        return "chitiethoadonle";
    }
    static getColmun(param) {
        if (param) {
            let tmp = ['mahoadon', 'maphutung', 'soluong', 'ghichu','chietkhau'];
            return tmp.filter(e => Object.keys(param).includes(e));
        }
        return "`mahoadon`,`maphutung`,`soluong`,`ghichu`,`chietkhau`";
    }
    static getLike(k) {
        return false;
    }
    static getSelect(tb) {
        return `${tb}.maphutung,${tb}.soluong,${tb}.ghichu,${tb}.chietkhau`;
    }
    static getParam(param) {
        let tmp = ['maphutung', 'soluong', 'ghichu','chietkhau'];
        let arr = Object.keys(param).filter(e => tmp.includes(e)).map(e => param[e])
        return arr;
    }
    static getArrayParam(param) {
        let tmp = ['maphutung', 'soluong', 'ghichu','chietkhau'];
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
        sql = "select ct.*,IFNULL(pt.giaban_le,0)  as dongia,pt.tentiengviet from chitiethoadonle ct LEFT JOIN phutung pt ON ct.maphutung=pt.maphutung where ct.mahoadon=?  group by ct.ma";
        res = await query(sql, param);
        result["chitiet"] = res;
        return result;
    }
    static getDuplicate() {
        return "";
    }
}

module.exports = BillLe;