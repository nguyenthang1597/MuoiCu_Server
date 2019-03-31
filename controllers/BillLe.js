const Bill = require("../models/Bill");
const BillLe = require("../models/BillLe");
const AbstractTwo = require("../models/AbstractTwo");
const Abstract = require('../models/Abstract');
module.exports = {
    getList: async function (req, res, next) {
        try {
            let resulft = await AbstractTwo.getList(Bill, BillLe, req.query);
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
            var param = Object.assign(req.params, req.query);
            let resulft = await AbstractTwo.getList(Bill, BillLe, param);
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
            var mahoadon = 'MHD-' + new Date().getTime();
            let {
                chitiet,
                ...conlai
            } = req.body;
            var bodybill = conlai;
            var detailbill = chitiet;
            bodybill['trangthai'] = 1;
            bodybill['loaihoadon'] = 1;
            bodybill['mahoadon'] = mahoadon;
            for (var k in detailbill) {
                detailbill[k]['mahoadon'] = mahoadon;
            }
            let resulft = await Abstract.add(Bill, bodybill);
            resulft = await Abstract.addMutil(BillLe, detailbill);
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
            var param = Object.assign(req.params, req.query);
            let resulft = await Abstract.add(Bill, req.body, req.param);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    delete: async function (req, res, next) {
        try {
            var param = Object.assign(req.params, req.query)
            let resulft = await Abstract.delete(Bill, param);
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