'use strict';

const express = require('express');
const app = express();
const http = require('http');
const compress = require('compression');
const server = http.Server(app);
const io = require('socket.io')(server);
const Boggle = require('solve-boggle'); // module I wrote for solving boggle!

io.on('connection', socket => {
  socket.on('error', err => {
    console.error(err);
    socket.disconnect();
  });
  socket.on('start', data => {
    if (socket.room && data.startOtherPlayersGames) {
      socket.to(socket.room).broadcast.emit('startGame');
    }
    try {
      socket.boggle = new Boggle(data.letters ? data.letters : undefined);
    } catch(err) {
      socket.boggle = new Boggle();
    }
    socket.emit('letters', socket.boggle.board.map(arr => arr.join('')).join(''));
    socket.boggle.solve(words => {
      socket.emit('solution', words);
    });
  });
  socket.on('join', room => {
    socket.room = room;
    socket.join(room);
  });
});

app.use(compress());
app.use(express.static(__dirname));

const port = process.env.PORT || 3000;
server.listen(port, console.log.bind(console, 'listening at http://localhost:' + port));
