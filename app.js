const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const {
  normalizePort,
  onError,
  onListening
} = require('./lib/server')

require('dotenv').config({
  path: '.env'
})

const app = express();
let server = http.createServer(app);
require('./lib/express')(app, logger, express, cookieParser);
require('./routes')(app);


const port = normalizePort(process.env.PORT || '8080')
server.port = port;


server.listen(server.port);
server.on('error', onError.bind(server));
server.on('listening', onListening.bind(server));



module.exports = app;