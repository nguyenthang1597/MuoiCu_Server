const Bill = require("../models/Bill");
const BillSuachua = require("../models/BillSuachua");
const AbstractTwo = require("../models/AbstractTwo");
const Abstract = require('../models/Abstract');
const XLSX = require('xlsx');
const librespone = require("../lib/respone");

module.exports = {
    getList: async function (req, res, next) {
        try {
            let resulft = await AbstractTwo.getList(Bill, BillSuachua, req.query);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getChitiet: async function (req, res, next) {
        try {
            let resulft = await BillSuachua.getChitiet(req.params.mahoadon);
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
            let resulft = await AbstractTwo.getList(Bill, BillSuachua, param);
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
            bodybill['trangthai'] = 0;
            bodybill['loaihoadon'] = 0;
            bodybill['mahoadon'] = mahoadon;
            for (var k in detailbill) {
                detailbill[k]['mahoadon'] = mahoadon;
            }
            let resulft = await Abstract.add(Bill, bodybill);
            resulft = await Abstract.addMutil(BillSuachua, detailbill);
            res.json({ "mahoadon": mahoadon });
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
            let resulft = await Abstract.add(Bill, req.body, req.params);
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
            let resulft = await BillSuachua.delete(req.params.ma);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    export: async function (req, res, next) {
        try {
            var workbook = XLSX.readFile(__dirname + '/excel/mausuachua.xlsx');
            var sheet_name_list = workbook.Sheets[workbook.SheetNames[0]];
            var ws_data = await BillSuachua.getChitiet(req.params.mahoadon);
            var wb = XLSX.utils.book_new();
            var ws = { ...sheet_name_list };
            var vitri = 25;
            ws["A8"] = { v: ws_data.tenkh, w: ws_data.tenkh, t: 's' };
            ws["AI2"] = { v: req.params.mahoadon, w: req.params.mahoadon, t: 's' };
            for (var i in ws_data.chitiet) {
                var dt = ws_data.chitiet[i];
                ws["B" + vitri] = { v: dt.tenphutungvacongviec, w: dt.tenphutungvacongviec, t: 's' };
                ws["O" + vitri] = { v: dt.dongia, w: dt.dongia, t: 's' };
                ws["U" + vitri] = { v: dt.soluongphutung, w: dt.soluongphutung, t: 'n' };
                ws["AE" + vitri] = { v: dt.tiencong, w: dt.tiencong, t: 'n' };
                vitri++;
            }
            // ws['!ref'] = 'A1:K6';
            // ws["A4"].v = "Ngày " + new_ws_name;
            // ws["A4"].h = "Ngày " + new_ws_name;
            // ws["A4"].w = "Ngày " + new_ws_name;
            // ws["A4"].r = "<t>Ngày " + new_ws_name + "<t>";

            // console.log(ws["A4"]);
            // XLSX.utils.sheet_add_aoa(ws, ws_data, { origin: -1 });
            XLSX.utils.book_append_sheet(wb, ws, "phieusuachua");



            res.setHeader('Content-disposition', 'attachment; filename=phieusuachua.xlsx');
            res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
            res.send(new Buffer(wbout));

        } catch (error) {
            librespone.send(req, res, error.message);
        }
    },

}