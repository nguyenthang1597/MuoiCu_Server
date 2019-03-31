class Employee {
    static getNameTable() {
        return "nhanvien";
    }
    static getColmun() {
        return "`ten`,`cmnd`,`sdt`,`gmail`,`taikhoan`";
    }
    static getJoin() {
        return "tb1.taikhoan=tb2.username";
    }
    static getSelect(tb) {
        return `${tb}.ma,${tb}.ten,${tb}.cmnd,${tb}.sdt,${tb}.gmail`;
    }
    static getParam(param) {
        let tmp = ['ten', 'cmnd', 'sdt', 'gmail', 'taikhoan'];
        let arr = Object.keys(param).filter(e => tmp.includes(e)).map(e => param[e])
        return arr;
    }
    static getForgenKey() {
        return "taikhoan";
    }
    static getKey() {
        return "ma";
    }
}

module.exports = Employee;