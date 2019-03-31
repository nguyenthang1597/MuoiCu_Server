class Item {
    static getNameTable() {
        return "chitietphutung";
    }
    static getColmun() {
        return "`maphutung`,`mamau`,`model`";
    }
    static getSelect(tb) {
        return `${tb}.mamau,${tb}.model`;
    }
    static getKey() {
        return "ma";
    }
    static getLike(k) {
        let tmp = ['mamau', 'model'];
        return tmp.includes(k);
    }
    static getParam(param) {
        let tmp = ['mamau', 'model'];
        let arr = Object.keys(param).filter(e => tmp.includes(e)).map(e => param[e])
        return arr;
    }
    static getArrayParam(param) {
        let tmp = ['mamau', 'model'];
        let obj = {};
        let arr = Object.keys(param).filter(e => tmp.includes(e));
        arr.forEach(e => {
            obj[e] = param[e];
        });
        return obj;
    }
}

module.exports = Item;