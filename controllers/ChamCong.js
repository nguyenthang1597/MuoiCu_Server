const passport = require("passport");
const ChamCong = require("../models/ChamCong");
const Statistic = require("../models/Statistic");
const Abstract = require("../models/Abstract");



module.exports = {
    getList: async function (req, res, next) {
        try {
            let resulft = await Abstract.getList(ChamCong, req.query);
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
            let resulft = await Abstract.getOne(ChamCong, param);
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
            var body = req.body.chitiet;
            var ngay = new Date();
            body = body.map(e => ({ ...e, "ngay": ngay }));
            let resulft = await Abstract.addMutil(ChamCong, body);
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
            let resulft = await Abstract.add(ChamCong, req.body, req.param);
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
            let resulft = await Abstract.delete(ChamCong, param);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getByNgay: async function (req, res, next) {
        try {
            var ngay = new Date();
            if (req.query.ngay)
                ngay = req.query.ngay;
            var param = [];
            param["start"] = ngay;
            param["end"] = ngay;

            let resulft = await Statistic.getBangCong(param);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },

};