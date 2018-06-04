const express = require('express');
const app = express(); 

const socket = require('socket.io'); // running on server

const server = app.listen(4000, function() {
    console.log('listening to requests on port 4000');
});

//Static files
app.use(express.static('public'));

//Socket setup

var io = socket(server);
io.on('connection', function(socket){ // get id from socket
    console.log('made socket connection', socket.id);

    //handle message(chat event ) on the server
    socket.on('chat', function(data){ // listen the data on the chat message
        io.sockets.emit('chat', data);    // refers to all the clients who connect to server
    }); // second param 'data' is sent by server 

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    })
});

