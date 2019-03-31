const query = require('../lib/db')

class Bill {
    static getNameTable() {
        return "hoadon";
    }
    static getColmun(param) {
        if (param) {
            let tmp = ['mahoadon', 'manv', 'tenkh', 'makh', 'tongtien', 'ngayban', 'ngaythanhtoan', 'trangthai', 'loaihoadon'];
            return tmp.filter(e => Object.keys(param).includes(e));
        }
        return "`mahoadon`,`manv`,`tenkh`,`makh`,`tongtien`,`ngayban`,`ngaythanhtoan`,`trangthai`,`loaihoadon`";
    }
    static getLike(k) {
        let tmp = ['tenkh'];
        return tmp.includes(k);
    }
    static getJoin() {
        return "tb1.mahoadon=tb2.mahoadon";
    }
    static getSelect(tb) {
        return `${tb}.mahoadon,${tb}.manv,${tb}.makh,${tb}.tongtien,${tb}.ngayban,${tb}.ngaythanhtoan,${tb}.trangthai,${tb}.loaihoadon`;
    }
}

module.exports = Bill;