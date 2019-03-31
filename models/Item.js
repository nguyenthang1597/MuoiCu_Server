class Item {
    static getNameTable() {
        return "phutung";
    }
    static getColmun() {
        return "`maphutung`,`tentienganh`,`tentiengviet`,`loaiphutung`,`giaban_head`, `giaban_le`, `giamua`, `soluongtonkho`";
    }
    static getJoin() {
        return "tb1.ma=tb2.maphutung";
    }
    static getSelect(tb) {
        return `${tb}.ma,${tb}.maphutung,${tb}.tentienganh,${tb}.tentiengviet,${tb}.loaiphutung,${tb}.giaban_head,${tb}.giaban_le,${tb}.giamua,${tb}.soluongtonkho`;
    }
    static getForgenKey() {
        return "maphutung";
    }
    static getKey() {
        return "ma";
    }
    static getForgenKey() {
        return "maphutung";
    }
    static getLike(k) {
        let tmp = ['maphutung', 'tentienganh', 'tentiengviet'];
        return tmp.includes(k);
    }
    static getParam(param) {
        let arr = Object.keys(param).filter(e => tmp.includes(e)).map(e => param[e])
        return arr;
    }
    static getArrayParam(param) {
        let tmp = ['maphutung', 'tentienganh', 'tentiengviet', 'loaiphutung', 'giaban_head', 'giaban_le', 'giamua', 'soluongtonkho'];
        let obj = {};
        let arr = Object.keys(param).filter(e => tmp.includes(e));
        arr.forEach(e => {
            obj[e] = param[e];
        });
        return obj;
    }

}

module.exports = Item;