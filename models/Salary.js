const query = require('../lib/db')

class Salary {
    static getNameTable() {
        return "tiencong";
    }
    static getColmun() {
        return "`ten`,`tien`";
    }
    static getLike(k) {
        let tmp = ['ten'];
        return tmp.includes(k);
    }
}

module.exports = Salary;