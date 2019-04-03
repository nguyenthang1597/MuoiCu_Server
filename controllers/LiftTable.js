var liftTable = Array(8).fill(1).map(e => ({ "trangthai": false, "mahoadon": "" }));
module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.emit('connected', liftTable);
        socket.on('select', (data) => {
            let index = Number.parseInt(data.maban);
            liftTable[index].trangthai = true;
            liftTable[index].mahoadon = data.mahoadon;
            socket.emit('lifttable', liftTable);
            socket.broadcast.emit('lifttable', liftTable);
        })
        socket.on('release', (data) => {
            let index = Number.parseInt(data.maban);
            liftTable[index].trangthai = false;
            liftTable[index].mahoadon = "";
            socket.emit('lifttable', liftTable);
            socket.broadcast.emit('lifttable', liftTable);
        })
    })
}
