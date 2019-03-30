const query = require('../lib/db')
const Encrypt = require('../lib/encryptPassword');

class Account {
    constructor(Username, Password, Chucvu, Ten) {
        this.Username = Username;
        this.Password = Password;
        this.Chucvu = Chucvu;
        this.Ten = Ten;
    }
    async save(params) {
        if (!this.Username || !this.Password || !this.Chucvu || !this.Ten) {
            let error = new Error();
            error.name = 'MISSINGDATA';
            error.name = 'Thiếu thông tin để tạo tài khoản.';
            throw error;
        }
        try {
            let HashPassword = new Encrypt(this.Password);
            let sql;
            sql = `INSERT INTO taikhoan (username, password, chucvu)values ('${this.Username}', '${HashPassword.hash()}', '${this.Chucvu}')`;
            await query(sql);
            sql = `INSERT INTO nhanvien (ten, taikhoan) values('${this.Ten}', '${this.Username}')`;
            await query(sql);
        } catch (error) {
            throw error;
        }
    }
    static async findByUsername(Username) {
        if (!Username)
            return null;
        let sql = `SELECT * FROM taikhoan where username='${Username}'`;
        console.log(sql);
        let res = await query(sql);
        console.log('rows', res);
        if (res) return res[0];
        return null;
    }
}

module.exports = Account;