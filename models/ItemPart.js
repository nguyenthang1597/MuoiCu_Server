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
}

module.exports = Item;