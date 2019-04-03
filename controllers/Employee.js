const Employee = require("../models/Employee");
const Account = require("../models/Account");
const AbstractTwo = require("../models/AbstractTwo");
const Abstract = require('../models/Abstract');
const Encrypt = require('../lib/encryptPassword');
module.exports = {
    getList: async function (req, res, next) {
        try {
            let resulft = await AbstractTwo.getList(Employee, Account, req.query);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getByMa: async function (req, res, next) {
        try {
            let resulft = await AbstractTwo.getOne(Employee, Account, req.query, req.params);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getByTaikhoan: async function (req, res, next) {
        try {
            let resulft = await AbstractTwo.getOne(Employee, Account, req.query, req.params);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    add: async function (req, res, next) {
        try {
            var body=req.body;
            body["password"];
            let resulft = await AbstractTwo.add(Account, Employee, req.body);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    update: async function (req, res, next) {
        try {
            let resulft = await AbstractTwo.update(Account, Employee, req.body, req.params);
            res.json(resulft);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    delete: async function (req, res, next) {
        try {
            let resulft = await AbstractTwo.delete(Account, Employee, req.params);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
}