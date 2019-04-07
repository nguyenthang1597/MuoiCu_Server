class Item {
    static getNameTable() {
        return "phutung";
    }
    static getColmun(param) {
        if (param) {
            let tmp = ['maphutung', 'tentienganh', 'tentiengviet', 'loaiphutung', 'giaban_head', 'giaban_le', 'soluongtonkho', 'ghichu', 'vitri', 'ngaycapnhat', 'vat_head', 'vat_le', 'giaban_head_chuavat', 'giaban_le_chuavat'];
            return tmp.filter(e => Object.keys(param).includes(e));
        }
        return "`maphutung`,`tentienganh`,`tentiengviet`,`loaiphutung`,`giaban_head`, `giaban_le`, `soluongtonkho`,`ghichu`,`vitri`,`ngaycapnhat`,`vat_head`,`vat_le`,`giaban_head_chuavat`,`giaban_le_chuavat`";
    }
    static getJoin() {
        return "tb1.ma=tb2.maphutung";
    }
    static getSelect(tb) {
        return `${tb}.ma,${tb}.maphutung,${tb}.tentienganh,${tb}.tentiengviet,${tb}.loaiphutung,${tb}.giaban_head,${tb}.giaban_le,${tb}.soluongtonkho,${tb}.ghichu,${tb}.vitri,${tb}.ngaycapnhat,${tb}.vat_head,${tb}.vat_le,${tb}.giaban_head_chuavat,${tb}.giaban_le_chuavat`;
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
        let tmp = ['maphutung', 'tentienganh', 'tentiengviet', 'loaiphutung', 'giaban_head', 'giaban_le', 'soluongtonkho', 'ghichu', 'vitri', 'ngaycapnhat', 'vat_head', 'vat_le', 'giaban_head_chuavat', 'giaban_le_chuavat'];
        let arr = Object.keys(param).filter(e => tmp.includes(e)).map(e => param[e])
        return arr;
    }
    static getArrayParam(param) {
        let tmp = ['maphutung', 'tentienganh', 'tentiengviet', 'loaiphutung', 'giaban_head', 'giaban_le', 'soluongtonkho', 'ghichu', 'vitri', 'ngaycapnhat', 'vat_head', 'vat_le', 'giaban_head_chuavat', 'giaban_le_chuavat'];
        let obj = {};
        let arr = Object.keys(param).filter(e => tmp.includes(e));
        arr.forEach(e => {
            obj[e] = param[e];
        });
        return obj;
    }

}

module.exports = Item;