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
    static getLike(k) {
        let tmp = ['maphutung', 'tentienganh', 'tentiengviet'];
        return tmp.includes(k);
    }
}

module.exports = Item;