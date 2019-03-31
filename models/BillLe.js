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
}

module.exports = BillLe;