window.jQuery = window.$ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var io = require('socket.io-client');
var qs = require('querystring');

var socket = io();

var Controls = require('./components/controls');
var Board = require('./components/board');
var Scores = require('./components/scores');

var Game = React.createClass({
  getInitialState: function() {
    return {
      letters: '',
      start: null,
    };
  },
  has: function(y, x) {
    return x >= 0 && x < 4 && y >= 0 && y < 4;
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Controls { ...this.state } />
          <Board { ...this.state } />
        </div>
        <div className="col-md-6">
          <Scores { ...this.state } />
        </div>
      </div>
    );
  }
});


ReactDOM.render(<Game />, document.getElementById('content'));
// make buttons for board



$('#start').on('click', start);
start();
$('#word-input').on('keyup', checkIfInBoard);
$('#word-input').on('keypress', validate);
$('#word-form').on('submit', checkIfWord);
$('button.letter').on('click', insertLetter);

function start(e) {
  var query = qs.parse(location.search.slice(1));
  socket.emit('start', query.board);
}
socket.on('letters', function(letters) {
  game = new Game(letters);
  fillDOMBoard();
});
socket.on('solution', function(words) {
  game.words = words;
  game.found = [];
  populatePercentageBars();
});

function checkIfInBoard(e) {
  $board.find('button').removeClass('active');
  var target = e.target.value.toUpperCase();
  var visited = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ];
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      search(y, x, '', [], 0);
    }
  }
  function search(y, x, word, path, depth) {
    var $button = $board.find('[data-row='+ y +'][data-col='+ x + ']');
    path = path.concat($button);
    var nextChar = $button.text();
    word += nextChar;
    if (depth === target.length - 1) {
      return word === target ? highlight(path) : false;
    }
    if (nextChar !== target[depth]) {
      return false;
    }
    visited[y][x] = true;
    if (game.has(y - 1, x - 1) && !visited[y - 1][x - 1]) {
      search(y - 1, x - 1, word, path, depth + 1);
    }
    if (game.has(y - 1, x) && !visited[y - 1][x]) {
      search(y - 1, x, word, path, depth + 1);
    }
    if (game.has(y - 1, x + 1) && !visited[y - 1][x + 1]) {
      search(y - 1, x + 1, word, path, depth + 1);
    }
    if (game.has(y, x - 1) && !visited[y][x - 1]) {
      search(y, x - 1, word, path, depth + 1);
    }
    if (game.has(y, x + 1) && !visited[y][x + 1]) {
      search(y, x + 1, word, path, depth + 1);
    }
    if (game.has(y + 1, x - 1) && !visited[y + 1][x - 1]) {
      search(y + 1, x - 1, word, path, depth + 1);
    }
    if (game.has(y + 1, x) && !visited[y + 1][x]) {
      search(y + 1, x, word, path, depth + 1);
    }
    if (game.has(y + 1, x + 1) && !visited[y + 1][x + 1]) {
      search(y + 1, x + 1, word, path, depth + 1);
    }
    visited[y][x] = false;
  }
}

function highlight(path) {
  path.forEach(function($button) {
    $button.addClass('active');
  });
}

function validate(e) {
  if (e.keyCode === 13) return; // press enter to submit form
  var char = String.fromCharCode(e.charCode);
  if (!char.match(/[a-z]/i)) { // prevent them from entering things that aren't letters
    e.preventDefault();
  }
}

function checkIfWord(e) {
  e.preventDefault();
  var word = e.target.word.value.toUpperCase();
  var index = game.words.indexOf(word);
  if (index !== -1) {
    addWord(word);
    game.words.splice(index, 1);
  }
}

function addWord(word) {
  $('<p/>', { text: word }).appendTo('.words');
  $('#word-input').val('');
}

function fillDOMBoard() {
  $board.find('button').each(function() {
    this.innerText = game.letters[this.getAttribute('data-row')][this.getAttribute('data-col')];
  });
}

function insertLetter(e) {
  var char = e.target.innerText;
  var $input = $('#word-input');
  $input[0].value += char;
  $input.trigger('keyup');
}

function populatePercentageBars() {
  console.log(game.words);
}
