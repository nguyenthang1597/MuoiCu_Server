const query = require('../lib/db')

class Salary {
    static getNameTable() {
        return "tiencong";
    }
    static getColmun() {
        return "`ten`,`tien`";
    }
}

module.exports = Salary;