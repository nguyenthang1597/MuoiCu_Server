const query = require('../lib/db')

class Customer {
    static getNameTable() {
        return "khachhang";
    }
    static getColmun() {
        return "`ten`,`sodienthoai`,diachi`";
    }
}

module.exports = Customer;