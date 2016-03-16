var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var Boggle = require('solve-boggle');

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('start', function(letters){
    socket.boggle = new Boggle(letters ? letters : undefined);
    io.emit('letters', socket.boggle.board);
    socket.boggle.solve(function(words) {
      io.emit('solution', words);
    });
  });
});

app.use(express.static(__dirname));

var port = process.env.PORT || 3000;
server.listen(port, console.log.bind(console, 'listening at http://localhost:' + port));
