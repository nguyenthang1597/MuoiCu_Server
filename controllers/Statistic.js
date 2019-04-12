
const Statistic = require("../models/Statistic");
const XLSX = require('xlsx');
const librespone = require("../lib/respone");
const BillLe = require("../models/BillLe");



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
    getBillExport: async function (req, res, next) {
        try {
            var param = req.query;
            if (!param.end)
                param.end = new Date();
            if (!param.start)
                param.start = new Date();
            let resulft = await Statistic.getBill(req.query);
            
            var workbook = XLSX.readFile(__dirname + '/excel/mauphutung.xlsx');
            var sheet_name_list = workbook.Sheets[workbook.SheetNames[0]];

            var ws = { ...sheet_name_list };
            var wb = XLSX.utils.book_new();

            var k=3;
            var cc=['A','B','C','D','E','F','G','H','L'];
            var ci=1;
            var data=[];


            // for(var i in resulft)
            // {
            //     if(resulft[i].loaihoadon==1)
            //     {                    
            //         var datt=await BillLe.getChitiet(resulft[i].mahoadon);
            //         for(var l in datt){
            //             data[datt[l].maphutung]+=datt[l].maphutung;
            //         }
            //         console.log(datt);
            //     }
            
            // }
            XLSX.utils.book_append_sheet(wb, ws, 'billel');
            XLSX.utils.book_append_sheet(wb, ws, 'billchan');
            res.setHeader('Content-disposition', 'attachment; filename=filecong.xlsx');
            res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
            res.send(new Buffer(wbout));
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
            var param = req.query;
            if (!param.end)
                param.end = new Date();
            if (!param.start)
                param.start = new Date();
            let resulft = await Statistic.getBangCongEmployee(param);
            console.log(resulft);
            res.json(resulft);
        } catch (error) {
            librespone.error(req, res, error.message);
        }
    },
    getBangCongEmployeeExecl: async function (req, res, next) {
        try {
            var param = req.query;
            if (!param.end)
                param.end = new Date();
            if (!param.start)
                param.start = new Date();
            let resulft = await Statistic.getBangCongEmployee(param);

            var workbook = XLSX.readFile(__dirname + '/excel/maubaocao.xlsx');
            var sheet_name_list = workbook.Sheets[workbook.SheetNames[0]];
            var ws = { ...sheet_name_list };

            var wb = XLSX.utils.book_new();
            console.log(ws);
            var nameDate="Từ ngày "+param.start+" đến hết ngày"+param.end;
            // XLSX.utils.sheet_add_aoa(ws, resulft, { origin: -1 });
            var k=3;
            var cc=['A','B','C','D','E','F','G','H','L'];
            var ci=1;
            ws['A2']={
                t:'s',
                v:nameDate,
                r:nameDate,
                w:nameDate
            }
            ws['A3']={
                t:'s',
                v:'Ngày',
                r:'Ngày',
                w:'Ngày'
            }

            for(var m in resulft[0].data){
                console.log(resulft[0].ngay)
                ws[cc[ci]+k]={
                    t:'s',
                    v:resulft[0].data[m].ten,
                    r:"<t>"+resulft[0].data[m].ten+"<t>",
                    w:resulft[0].data[m].ten,
                }
                ci++;
            }
            k++;

            for(var i in resulft){
                ws['A'+k]={
                    t:'s',
                    v:resulft[i].ngay,
                    r:resulft[i].ngay,
                    w:resulft[i].ngay
                };
                ci=1;
                for(var m in resulft[i].data){
                    var data={
                        t:'n',
                        v:parseInt(resulft[i].data[m].tiencong)+parseInt(resulft[i].data[m].vskp)+parseInt(resulft[i].data[m].vsbd),
                        r:"<t>"+parseInt(resulft[i].data[m].tiencong)+parseInt(resulft[i].data[m].vskp)+parseInt(resulft[i].data[m].vsbd)+"<t>",
                        w:parseInt(resulft[i].data[m].tiencong)+parseInt(resulft[i].data[m].vskp)+parseInt(resulft[i].data[m].vsbd),
                    }
                    ws[cc[ci]+k]=data;
                    ci++;
                }
                k++;
            }
            ws['!ref']='A1:'+cc[ci]+k;
            console.log(ws);
            XLSX.utils.book_append_sheet(wb, ws, 'export');
            res.setHeader('Content-disposition', 'attachment; filename=filecong.xlsx');
            res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
            res.send(new Buffer(wbout));
        } catch (error) {
            librespone.error(req, res, error.message);
        }
    },
    getExeclBangCongEmployee: async function (req, res, next) {
        try {
            var param = {};
            if (req.query.start) {
                param.start = req.query.start;
            }
            else
                param.start = new Date();
            if (req.query.end)
                param.end = req.query.end;
            else
                param.end = new Date();
            let resulft = await Statistic.getBangCongEmployee(param);
            var workbook = XLSX.readFile(__dirname + '/excel/mauphutung.xlsx');
            var sheet_name_list = workbook.Sheets[workbook.SheetNames[0]];


            XLSX.utils.sheet_add_aoa(ws, ws_data, { origin: -1 });
            XLSX.utils.book_append_sheet(wb, ws, new_ws_name);

            var ws_data = await Statistic.getTonKhoItem(req.query);
            var wb = XLSX.utils.book_new();
            var ws = { ...sheet_name_list };
            XLSX.utils.sheet_add_aoa(ws, ws_data, { origin: -1 });
            XLSX.utils.book_append_sheet(wb, ws, new_ws_name);
            res.setHeader('Content-disposition', 'attachment; filename=filecong.xlsx');
            res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
            res.send(new Buffer(wbout));

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
            var workbook = XLSX.readFile(__dirname + '/excel/mauphutung.xlsx');
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
            console.log(ws_data);
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
    },
    inportItem: async function (req, res, next) {
        return res.json({});
    }
};