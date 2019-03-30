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
        console.log(res1);




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
        console.log(sql);
        console.log(param);
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

module.exports = AbstractTwo;