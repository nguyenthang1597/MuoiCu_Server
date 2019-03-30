const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
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
require('./lib/express')(app, logger, express, cookieParser, passport, cors);
require('./lib/passport')(passport);
require('./routes')(app);

let io = require('./lib/socket')(server);
io.on('connection', function (socket) {
  socket.emit('connected', 'Hello')
})
app.io = io;


const port = normalizePort(config.port)
server.port = port;

server.listen(server.port);
server.on('error', onError.bind(server));
server.on('listening', onListening.bind(server));

require('./models/test');

module.exports = app;