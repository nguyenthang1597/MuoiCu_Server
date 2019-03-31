const query = require('../lib/db')
const Encrypt = require('../lib/encryptPassword');

class AbstractTwo {
    static async getList(ClassTableOne, ClassTableTwo, param, param1, param2) {
        let where = ' 1=? ';
        let wherevalue = [
            1,
        ];
        if (param) {
            for (var k in param) {
                where = where + " AND " + k + ' = ? ';
                wherevalue.push(param[k]);
            }
        }
        if (param1) {
            for (var k in param1) {
                where = where + " AND tb1." + k + ' = ? ';
                wherevalue.push(param1[k]);
            }
        }
        if (param2) {
            for (var k in param2) {
                where = where + " AND tb2." + k + ' = ? ';
                wherevalue.push(param2[k]);
            }
        }
        let sql = `SELECT ${ClassTableOne.getSelect('tb1')},${ClassTableTwo.getSelect('tb2')} FROM ${ClassTableOne.getNameTable()} tb1 INNER JOIN ${ClassTableTwo.getNameTable()} tb2 ON ${ClassTableOne.getJoin()} where ${where} `;
        console.log(sql, wherevalue);
        let res = await query(sql, wherevalue);
        return res;
    }
    static async getOne(ClassTableOne, ClassTableTwo, param, param1, param2) {
        let res = await AbstractTwo.getList(ClassTableOne, ClassTableTwo, param, param1, param2);
        if (!res)
            return null;
        return res[0];
    }
    static async add(ClassTableOne, ClassTableTwo, param) {
        let param1 = ClassTableOne.getParam(param);
        let values = '';
        for (let a of param1) {
            values = values + `'${a}'` + ',';
        }
        values = values.substr(0, values.length - 1);
        let sql1 = `INSERT INTO ${ClassTableOne.getNameTable()} (` + ClassTableOne.getColmun() + `) VALUES (${values})`;
        let res1 = await query(sql1);
        let param2 = ClassTableTwo.getParam(param);
        values = '';
        for (let a of param2) {
            values = values + `'${a}'` + ',';
        }
        values = values.substr(0, values.length - 1);
        let sql2 = `INSERT INTO ${ClassTableTwo.getNameTable()} (` + ClassTableTwo.getColmun() + `) VALUES (${values})`;
        let res2 = await query(sql2);
        return res2;
    }
    static async update(ClassTableOne, ClassTableTwo, paramSetValue, paramWhere) {

        let param = [1];
        let where = ' 1=? ';
        let param1=[], param2 = [];

        if (paramWhere) {
            for (var k in paramWhere) {
                where = where + " AND " + k + ' = ? ';
                param.push(paramWhere[k]);
            }
        }

        let paramSetValue1 = ClassTableOne.getParam(paramSetValue);
        let set1 = '', set2 = '';
        for (var k in paramSetValue1) {
            set1 = set1 + k + ' = ? ,';
            param1.push(paramSetValue1[k]);
        }
        for (var k in paramSetValue2) {
            set2 = set2 + k + ' = ? ,';
            param2.push(paramSetValue2[k]);
        }
        set1 = set1.substr(0, set1.length - 1);
        set2 = set2.substr(0, set2.length - 1);
        let sql = `UPDATE ${ClassTableOne.getNameTable()} SET ${set1} WHERE ${ClassTableOne.getKey()} IN (SELECT ${ClassTableTwo.getForgenKey()} FROM ${ClassTableTwo.getNameTable()} where ${where})`;
        console.log(sql);
        res = await query(sql, wherevalue);

        sql = `UPDATE ${ClassTableTwo.getNameTable()} SET ${set2} where ${where}`;
        console.log(sql);

        let res = await query(sql, param);
        return res;
    }
    static async delete(ClassTableOne, ClassTableTwo, param1) {
        let res = null;
        if (!param1) {
            return null;
        }
        let where = ' 1=? ';
        let wherevalue = [
            1,
        ];
        for (var k in param1) {
            where = where + " AND " + k + ' = ? ';
            wherevalue.push(param1[k]);
        }
        let sql = `DELETE FROM ${ClassTableOne.getNameTable()} WHERE ${ClassTableOne.getKey()} IN (SELECT ${ClassTableTwo.getForgenKey()} FROM ${ClassTableTwo.getNameTable()} where ${where})`;
        console.log(sql);
        res = await query(sql, wherevalue);
        sql = `DELETE FROM ${ClassTableTwo.getNameTable()} where ${where}`;
        console.log(sql);
        res = await query(sql, wherevalue);
        return res;
    }
}

module.exports = AbstractTwo;