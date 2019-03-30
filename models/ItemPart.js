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
}

module.exports = Item;