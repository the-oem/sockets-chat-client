const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const connectedUsers = [];

const path = require('path');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  // console.log(`User socket ${socket.id} connected.`);
  socket.broadcast.emit('broadcast', 'New user connected.');

  socket.on('disconnect', function(){
    // console.log(`User socket ${socket.id} disconnected.`);
    socket.broadcast.emit('broadcast', 'A user disconnected.');
  });

  socket.on('chat message', function(msg){
    socket.broadcast.emit('broadcast', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
