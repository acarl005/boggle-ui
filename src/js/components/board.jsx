var React = require('react');
var $board;

var Board = React.createClass({

  selectWord: function(e) {
    var selected = e.target.value;
    this.props.setSelected(selected);
  },

  checkIfWordInBoard: function(e) {
    e.preventDefault();
    var word = e.target.word.value.toUpperCase();
    if (this.props.words.has(word)) {
      e.target.word.value = '';
      this.props.pushFound(word);
      this.props.setSelected('');
    }
  },

  componentDidMount: function() {
    $board = $('#board');
  },

  componentWillReceiveProps: function(props) {
    $board.find('button').removeClass('active');
    pressSelection(props.selected);
  },

  pushLetter: function(e) {
    var char = e.target.innerText;
    var input = document.getElementById('word-input');
    input.value += char;
    var event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  },

  render: function() {
    var buttons = [];
    for (var i = 0; i < 16; i++) {
      buttons.push(
        <button className="btn btn3d btn-white letter" key={i}
                data-row={Math.floor(i / 4)} data-col={i % 4} onClick={this.pushLetter}>
          {this.props.letters[i]}
        </button>
      );
    }
    return (
      <div>
        <div id="board">
          { buttons }
        </div>
        <form id="word-form" onSubmit={this.checkIfWordInBoard}>
          <input id="word-input" type="text" name="word" pattern="[a-zA-Z]+" onChange={this.selectWord} />
        </form>
      </div>
    );
  }

});

function pressSelection(target) {
  target = target.toUpperCase();
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
    path = path.concat($button[0]);
    var nextChar = $button.text();
    word += nextChar;
    if (depth === target.length - 1) {
      return word === target ? highlight(path) : false;
    }
    if (nextChar !== target[depth]) {
      return false;
    }
    visited[y][x] = true;
    if (has(y - 1, x - 1) && !visited[y - 1][x - 1]) {
      search(y - 1, x - 1, word, path, depth + 1);
    }
    if (has(y - 1, x) && !visited[y - 1][x]) {
      search(y - 1, x, word, path, depth + 1);
    }
    if (has(y - 1, x + 1) && !visited[y - 1][x + 1]) {
      search(y - 1, x + 1, word, path, depth + 1);
    }
    if (has(y, x - 1) && !visited[y][x - 1]) {
      search(y, x - 1, word, path, depth + 1);
    }
    if (has(y, x + 1) && !visited[y][x + 1]) {
      search(y, x + 1, word, path, depth + 1);
    }
    if (has(y + 1, x - 1) && !visited[y + 1][x - 1]) {
      search(y + 1, x - 1, word, path, depth + 1);
    }
    if (has(y + 1, x) && !visited[y + 1][x]) {
      search(y + 1, x, word, path, depth + 1);
    }
    if (has(y + 1, x + 1) && !visited[y + 1][x + 1]) {
      search(y + 1, x + 1, word, path, depth + 1);
    }
    visited[y][x] = false;
  }

  function has(y, x) {
    return x >= 0 && x < 4 && y >= 0 && y < 4;
  }
}

function highlight(path) {
  $(path).addClass('active');
}

module.exports = Board;
