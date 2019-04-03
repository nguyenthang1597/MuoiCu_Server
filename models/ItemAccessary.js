class Item {
    static getNameTable() {
        return "chitietphukien";
    }
    static getColmun(param) {
        if (param) {
            let tmp = ['maphutung', 'loaixe'];
            return tmp.filter(e => Object.keys(param).includes(e));
        }
        return "`maphutung`,`loaixe`";
    }
    static getSelect(tb) {
        return `${tb}.loaixe`;
    }
    static getLike(k) {
        let tmp = ['loaixe'];
        return tmp.includes(k);
    }
    static getKey() {
        return "ma";
    }
    static getParam(param) {
        let tmp = ['loaixe'];
        let arr = Object.keys(param).filter(e => tmp.includes(e)).map(e => param[e])
        return arr;
    }
    static getForgenKey() {
        return "maphutung";
    }
    static getArrayParam(param) {
        let tmp = ['loaixe'];
        let obj = {};
        let arr = Object.keys(param).filter(e => tmp.includes(e));
        arr.forEach(e => {
            obj[e] = param[e];
        });
        return obj;
    }
}

module.exports = Item;