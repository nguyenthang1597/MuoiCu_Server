const query = require('../lib/db')

class Customer {
    static getNameTable() {
        return "khachhang";
    }
    static getColmun() {
        return "`ten`,`sodienthoai`,diachi`";
    }
    static getLike(k) {
        let tmp = ['ten', 'sodienthoai', 'diachi'];
        return tmp.includes(k);
    }
}

module.exports = Customer;