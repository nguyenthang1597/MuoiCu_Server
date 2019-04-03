var liftTable = [];
for (var i = 0; i < 8; i++)
    liftTable[i] = { "trangthai": 0, "mahoadon": "" };
module.exports = function (io) {
    io.on('connection', function (socket) {

        socket.on('connected', (data) => {
            socket.emit('connected', liftTable);
        });

        socket.on('select', (data) => {
            try {
                let index = Number.parseInt(data.maban);
                liftTable[index].mahoadon = data.mahoadon;
                liftTable[index].trangthai = 1;
                socket.emit('lifttable', liftTable);
                socket.broadcast.emit('lifttableFull', liftTable);
            } catch (e) {
            }
        })
        socket.on('bill', (data) => {
            try {
                let index = Number.parseInt(data.maban);
                liftTable[index].mahoadon = data.mahoadon;
                liftTable[index].trangthai = 2;
                socket.emit('lifttable', liftTable);
                socket.broadcast.emit('lifttableFull', liftTable);
            } catch (e) {
            }
        })
        socket.on('release', (data) => {
            try {
                let index = Number.parseInt(data.maban);
                liftTable[index].trangthai = 0;
                liftTable[index].mahoadon = "";
                socket.emit('lifttable', liftTable);
                socket.broadcast.emit('lifttableFull', liftTable);
            } catch (e) {

            }
        })
    })
}
