class Item {
    static getNameTable() {
        return "chitietphukien";
    }
    static getColmun() {
        return "`maphutung`,`loaixe`";
    }
    static getSelect(tb) {
        return `${tb}.loaixe`;
    }
    static getLike(k) {
        let tmp = ['loaixe'];
        return tmp.includes(k);
    }
}

module.exports = Item;