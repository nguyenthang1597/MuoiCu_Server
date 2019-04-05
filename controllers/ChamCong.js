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
            if (req.params.ngay)
                ngay = new Date(req.params.ngay);
            // var mdy = praram.split('-');
            // praram = new Date(mdy[2], mdy[1], mdy[0]);
            let resulft = await Statistic.getBangCong(ngay);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    addChamCong: async function (req, res, next) {
        try {
            var ngay = new Date();
            if (req.params.ngay)
            {
                console.log("ngayu",req.params.ngay);
                ngay = new Date(req.params.ngay);
                console.log(ngay);
            }
            let resulft = await Statistic.addBangCong(ngay, req.body.chitiet);
            if (resulft == null)
                res.status(400).json({
                    error: {
                        message: "Không thể insert database"
                    }
                })
            else
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