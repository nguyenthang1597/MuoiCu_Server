var liftTable = Array(8).fill({ "trangthai": false, "mahoadon": "" });
module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.emit('connected', liftTable);
        socket.on('select', (data) => {
            try {
                let index = Number.parseInt(data.maban);
                // liftTable[index].mahoadon = data.mahoadon;
                liftTable[index].trangthai = true;
                socket.emit('lifttable', liftTable);
                socket.emit('index', index);
                socket.broadcast.emit('lifttable', liftTable);
                socket.broadcast.emit('index', index);

            } catch (e) {

            }

        })
        socket.on('release', (data) => {
            try {
                let index = Number.parseInt(data.maban);
                liftTable[index].trangthai = false;
                liftTable[index].mahoadon = "";
                socket.emit('lifttable', liftTable);
                socket.broadcast.emit('lifttable', liftTable);
            } catch (e) {

            }
        })
    })
}
