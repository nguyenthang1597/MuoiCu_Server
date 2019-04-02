const query = require('../lib/db')

class BillLe {
    static getNameTable() {
        return "chitiethoadonle";
    }
    static getColmun(param) {
        if (param) {
            let tmp = ['mahoadon', 'maphutung', 'soluong', 'ghichu'];
            return tmp.filter(e => Object.keys(param).includes(e));
        }
        return "`mahoadon`,`maphutung`,`soluong`,`ghichu`";
    }
    static getLike(k) {
        return false;
    }
    static getSelect(tb) {
        return `${tb}.maphutung,${tb}.soluong,${tb}.ghichu`;
    }
    static getParam(param) {
        let tmp = ['maphutung', 'soluong', 'ghichu'];
        let arr = Object.keys(param).filter(e => tmp.includes(e)).map(e => param[e])
        return arr;
    }
    static getArrayParam(param) {
        let tmp = ['maphutung', 'soluong', 'ghichu'];
        let obj = {};
        let arr = Object.keys(param).filter(e => tmp.includes(e));
        arr.forEach(e => {
            obj[e] = param[e];
        });
        return obj;
    }
}

module.exports = BillLe;