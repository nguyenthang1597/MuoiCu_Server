module.exports = (app) => {
  app.use('/', (req, res) => {
    res.json({
      'message': 'OK'
    })
  })

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