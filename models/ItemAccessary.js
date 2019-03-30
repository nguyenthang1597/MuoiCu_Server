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
}

module.exports = Item;