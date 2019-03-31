const query = require('../lib/db')
const Encrypt = require('../lib/encryptPassword');

class Abstract {
    static async getList(ClassTable, param) {
        let where = ' 1=? ';
        let wherevalue = [
            1,
        ];
        if (param) {
            for (var k in param) {
                if (ClassTable.getLike(k)) {
                    where = where + " AND " + k + ' LIKE ? ';
                    wherevalue.push("%" + param[k] + "%");
                }
                else {
                    where = where + " AND " + k + ' = ? ';
                    wherevalue.push(param[k]);
                }
            }
        }
        let sql = `SELECT * FROM ${ClassTable.getNameTable()} where ${where} `;
        let res = await query(sql, wherevalue);
        return res;
    }
    static async getOne(ClassTable, param) {
        let res = await Abstract.getList(ClassTable, param);
        if (!res)
            return null;
        return res[0];
    }
    static async add(ClassTable, param) {
        let params = Object.keys(param).map(e => param[e]);
        let values = '';
        for (let a of params) {
            values = values + `'${a}'` + ',';
        }
        values = values.substr(0, values.length - 1);
        let sql = `INSERT INTO ${ClassTable.getNameTable()} (` + ClassTable.getColmun() + `) VALUES (${values})`;
        let res = await query(sql, params);
        return res;
    }
    static async update(ClassTable, paramSetValue, paramWhere) {
        if (!paramSetValue || !paramWhere && !paramSetValue)
            return null;
        let set = '';
        let param = [];
        for (var k in paramSetValue) {
            set = set + k + ' = ? ,';
            param.push(paramSetValue[k]);
        }
        set = set.substr(0, set.length - 1);
        let where = ' 1=? ';
        param.push(1);
        if (paramWhere) {
            for (var k in paramWhere) {
                where = where + " AND " + k + ' = ? ';
                param.push(paramWhere[k]);
            }
        }

        let sql = `UPDATE ${ClassTable.getNameTable()} SET ${set} where ${where}`;
        let res = await query(sql, param);
        return res;
    }
    static async delete(ClassTable, param) {
        if (!param)
            return null;
        let where = ' 1=? ';
        let wherevalue = [
            1,
        ];
        for (var k in param) {
            where = where + " AND " + k + ' = ? ';
            wherevalue.push(param[k]);
        }
        if (where === ' where 1=? ')
            return null;
        let sql = `DELETE FROM ${ClassTable.getNameTable()} where ${where}`;
        let res = await query(sql, wherevalue);
        return res;
    }
}

module.exports = Abstract;