const query = require('../lib/db')

class Customer {
    static getNameTable() {
        return "khachhang";
    }
    static getColmun(param) {
        if (param) {
            let tmp = ['ten', 'sodienthoai', 'diachi', 'biensoxe'];
            return tmp.filter(e => Object.keys(param).includes(e));
        }
        return "`ten`,`sodienthoai`,diachi`,`biensoxe`";
    }
    static getLike(k) {
        let tmp = ['ten', 'sodienthoai', 'diachi', 'biensoxe'];
        return tmp.includes(k);
    }
    static getDuplicate() {
        return "";
    }
}

module.exports = Customer;