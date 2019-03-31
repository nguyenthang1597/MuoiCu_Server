var liftTable = new Array(8).fill(false);

module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.emit('connected', liftTable);
        socket.on('select', (data) => {
            let index = Number.parseInt(data);
            liftTable[data] = true;
            socket.emit('lifttable', liftTable);
            socket.broadcast.emit('lifttable', liftTable);
        })
        socket.on('release', (data) => {
            let index = Number.parseInt(data);
            liftTable[data] = false;
            socket.emit('lifttable', liftTable);
            socket.broadcast.emit('lifttable', liftTable);
        })
    })
}