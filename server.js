var express = require('express');
var app = express();
var http = require('http');
var compress = require('compression');
var server = http.Server(app);
var io = require('socket.io')(server);
var Boggle = require('solve-boggle');

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('error', err => {
    console.error(err);
    socket.destroy();
  });
  socket.on('start', letters => {
    socket.boggle = new Boggle(letters ? letters : undefined);
    io.emit('letters', socket.boggle.board.map(arr => arr.join('')).join(''));
    socket.boggle.solve(words => {
      io.emit('solution', words);
    });
  });
});

app.use(compress());
app.use(express.static(__dirname));

var port = process.env.PORT || 3000;
server.listen(port, console.log.bind(console, 'listening at http://localhost:' + port));
