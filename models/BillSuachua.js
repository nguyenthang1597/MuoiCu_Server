const query = require('../lib/db')

class BillChan {
    static getNameTable() {
        return "chitiethoadonsuachua";
    }
    static getColmun(param) {
        if (param) {
            let tmp = ['mahoadon', 'tenphutungvacongviec', 'maphutung', 'soluongphutung', 'tiencong', 'tongtien', 'manvsuachua'];
            return tmp.filter(e => Object.keys(param).includes(e));
        }
        return "`mahoadon`,`tenphutungvacongviec`,`maphutung`,`soluongphutung`,`tiencong`,`tongtien`,`manvsuachua`";
    }
    static getLike(k) {
        return false;
    }
    static getSelect(tb) {
        return `${tb}.tenphutungvacongviec,${tb}.maphutung,${tb}.soluongphutung,${tb}.tiencong,${tb}.tongtien,${tb}.manvsuachua`;
    }
    static getParam(param) {
        let tmp = ['mahoadon', 'tenphutungvacongviec', 'maphutung', 'soluongphutung', 'tiencong', 'tongtien', 'manvsuachua'];
        let arr = Object.keys(param).filter(e => tmp.includes(e)).map(e => param[e])
        return arr;
    }
    static getArrayParam(param) {
        let tmp = ['mahoadon', 'tenphutungvacongviec', 'maphutung', 'soluongphutung', 'tiencong', 'tongtien', 'manvsuachua'];
        let obj = {};
        let arr = Object.keys(param).filter(e => tmp.includes(e));
        arr.forEach(e => {
            obj[e] = param[e];
        });
        return obj;
    }
    static async delete(param) {
        let sql = "update hoadon set tranthai=2 where mahoadon= ?";
        var res = await query(sql, param);
        console.log(res);
    }
    static async getChitiet(param) {
        let sql = "select * from hoadon where mahoadon= ?";
        var result = [];
        var res = await query(sql, param);
        console.log(res);
        result = res[0];
        sql = "select ct.*,pt.giaban_le as dongia from chitiethoadonsuachua ct INNER JOIN phutung pt ON ct.maphutung=pt.maphutung where ct.mahoadon=? group by ct.ma";
        res = await query(sql, param);
        result["chitiet"] = res;
        return result;
    }
}

module.exports = BillChan;