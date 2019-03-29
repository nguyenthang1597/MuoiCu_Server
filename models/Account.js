const query = require('../lib/db')
const Encrypt = require('../lib/encryptPassword');

class Account {
    constructor(Username, Password, Chucvu) {
        this.Username = Username;
        this.Password = Password;
        this.Chucvu = Chucvu;
    }
    async save(params) {
        if (!this.Username || !this.Password || !this.Chucvu) {
            let error = new Error();
            error.name = 'MISSINGDATA';
            error.name = 'Thiếu thông tin để tạo tài khoản.';
            throw error;
        }
        try {
            let HashPassword = new Encrypt(this.Password);
            let sql = `INSERT INTO taikhoan (username, password, chucvu)values ('${this.Username}', '${HashPassword.hash()}', '${this.Chucvu}')`;
            console.log(sql);
            let res = await query(sql);
            return res;
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