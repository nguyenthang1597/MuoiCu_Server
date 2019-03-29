const AccountRouter = require('./Account');
module.exports = (app) => {
  app.use('/account', AccountRouter);

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