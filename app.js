const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const {
  normalizePort,
  onError,
  onListening
} = require('./lib/server')

require('dotenv').config({
  path: '.env'
})

const config = require('./config');

const app = express();
let server = http.createServer(app);
require('./lib/express')(app, logger, express, cookieParser, passport);
require('./lib/passport')(passport);
require('./routes')(app);


const port = normalizePort(config.port)
server.port = port;
console.log(config);

server.listen(server.port);
server.on('error', onError.bind(server));
server.on('listening', onListening.bind(server));

require('./models/test');

module.exports = app;