const express = require('express');
const app = express();

const path = require('path');
const server = require('http').createServer();

const socketio = require('socket.io');

server.on('request', app);

//create socket server to connect to
const io = socketio(server);


server.listen(8080, function () {
    console.log('Connect to port: 8080')
});



//static middleware from /public
app.use(express.static(path.join(__dirname, '../public')))

//wildcard routes
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', function (req, res) {
    res.sendFile(app.get('../public/index.html'));
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

//listen for connection
io.on('connection', (socket) => {
    console.log('client has connected');

    //socket event handlers here
    socket.on('createRoom', () => {
        const roomId = 1234;
        console.log('creating room' + roomId);
        socket.emit('roomCreated', {roomId: roomId});
        socket.join(roomId);
    });

    socket.on('newUser', (payload) => {
        console.log('triggered this')
        socket.join(payload.roomId);
        io.emit('userJoined', {name: payload.userName})
    })
    //game event handlers here

});
