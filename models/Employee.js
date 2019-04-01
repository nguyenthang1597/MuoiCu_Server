class Employee {
    static getNameTable() {
        return "nhanvien";
    }
    static getColmun(param) {
        if (param) {
            let tmp = ['ten', 'cmnd', 'sdt', 'gmail', 'taikhoan'];
            return tmp.filter(e => Object.keys(param).includes(e));
        }
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
    static getArrayParam(param) {
        let tmp = ['ten', 'cmnd', 'sdt', 'gmail', 'taikhoan'];
        let obj = {};
        let arr = Object.keys(param).filter(e => tmp.includes(e));
        arr.forEach(e => {
            obj[e] = param[e];
        });
        return obj;
    }
    static getForgenKey() {
        return "taikhoan";
    }
    static getKey() {
        return "ma";
    }
    static getLike(k) {
        let tmp = ['ten', 'cmnd', 'sdt', 'gmail'];
        return tmp.includes(k);
    }
}

module.exports = Employee;