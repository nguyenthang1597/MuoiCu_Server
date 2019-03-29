const AccountRouter = require('./Account');
const CustomerRouter = require('./Customer');
const SalaryRouter = require('./Salary');

module.exports = (app) => {
  app.use('/account', AccountRouter);
  app.use('/customer', CustomerRouter);
  app.use('/salary', SalaryRouter);



  app.use(function (req, res, next) {
    next(createError(404));
  });
  app.use(function (err, req, res, next) {
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message
      }
    })
  });
}