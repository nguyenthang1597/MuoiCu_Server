const AccountRouter = require('./Account');
const CustomerRouter = require('./Customer');
const SalaryRouter = require('./Salary');
const EmpoyeeRouter = require('./Employee')
const ItemRouter = require('./Item');
const ItemPartRouter = require('./ItemPart');
const ItemAccessaryRouter = require('./ItemAccessary');
const BillRouter = require('./Bill');
const BillleRouter = require('./BillLe');
const BillSuaChuaRouter = require('./BillSuachua');


const createError = require('http-errors');
const LiftTable = require('../controllers/LiftTable');
module.exports = (app) => {
  LiftTable(app.io);
  app.use('/account', AccountRouter);
  app.use('/customer', CustomerRouter);
  app.use('/salary', SalaryRouter);
  app.use('/employee', EmpoyeeRouter);
  app.use('/item', ItemRouter);
  app.use('/itempart', ItemPartRouter);
  app.use('/itemaccessary', ItemAccessaryRouter);
  app.use('/bill', BillRouter);
  app.use('/billle', BillleRouter);
  app.use('/billsuachua', BillSuaChuaRouter);




  app.use(function (req, res, next) {
    next(createError(404));
  });
  app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message
      }
    })
  });
}