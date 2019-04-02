const query = require('../lib/db')

class Salary {
    static getNameTable() {
        return "chamcong";
    }
    static getColmun(param) {
        if (param) {
            let tmp = ['manv', 'tiencong', 'vskp', 'vsbd', 'ghichu', 'ngay'];
            return tmp.filter(e => Object.keys(param).includes(e));
        }
        return "`manv`,`tiencong`,`vskp`,`vsbd`,`ghichu`,`ngay`";
    }
    static getLike(k) {
        let tmp = ['ghichu'];
        return tmp.includes(k);
    }

    static getParam(param) {
        let tmp = ['manv', 'tiencong', 'vskp', 'vsbd', 'ghichu', 'ngay'];
        let arr = Object.keys(param).filter(e => tmp.includes(e)).map(e => param[e])
        return arr;
    }
    static getArrayParam(param) {
        let tmp = ['manv', 'tiencong', 'vskp', 'vsbd', 'ghichu', 'ngay'];
        let obj = {};
        let arr = Object.keys(param).filter(e => tmp.includes(e));
        arr.forEach(e => {
            obj[e] = param[e];
        });
        return obj;
    }


}

module.exports = Salary;