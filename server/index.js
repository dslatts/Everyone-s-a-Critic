const express = require('express');
const app = express();

const path = require('path');
const server = require('http').createServer();

const socketio = require('socket.io');

server.on('request', app);

//create socket server to connect to
const io = socketio(server);


server.listen(6969, function () {
    console.log('The server waits: 6969')
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

//event listener
io.on('connection', (socket) => {
    console.log('client has connected');
});
