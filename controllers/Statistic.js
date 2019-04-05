
const Statistic = require("../models/Statistic");
const XLSX = require('xlsx');


module.exports = {
    getBill: async function (req, res, next) {
        try {
            let resulft = await Statistic.getBill(req.query);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getEmployee: async function (req, res, next) {
        try {
            let resulft = await Statistic.getEmployee(req.query);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getBangCongEmployee: async function (req, res, next) {
        try {
            let resulft = await Statistic.getBangCongEmployee(req.query);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getTonKhoItem: async function (req, res, next) {
        try {
            var workbook = XLSX.readFile(__dirname + '\\..\\public\\excel\\mauphutung.xlsx');
            var sheet_name_list = workbook.Sheets[workbook.SheetNames[0]];


            var date = new Date();
            var moment = require('moment');
            date = moment(date);

            var new_ws_name = date.format('DD-MM-YYYY');
            var ws_data = await Statistic.getTonKhoItem(req.query);
            var wb = XLSX.utils.book_new();
            var ws = { ...sheet_name_list };
            ws['!ref'] = 'A1:K6';
            ws["A4"].v = "Ngày " + new_ws_name;
            ws["A4"].h = "Ngày " + new_ws_name;
            ws["A4"].w = "Ngày " + new_ws_name;
            ws["A4"].r = "<t>Ngày " + new_ws_name + "<t>";

            console.log(ws["A4"]);
            XLSX.utils.sheet_add_aoa(ws, ws_data, { origin: -1 });
            XLSX.utils.book_append_sheet(wb, ws, new_ws_name);



            var fileName = "Categories.xlsx";
            res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
            res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
            res.send(new Buffer(wbout));

        } catch (error) {
            console.log(error.message);
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    }
};