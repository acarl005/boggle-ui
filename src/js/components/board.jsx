const React = require('react');
let $board;

const Board = React.createClass({

  selectWord: function(e) {
    let selected = e.target.value;
    this.props.setSelected(selected);
  },

  checkIfWordInBoard: function(e) {
    e.preventDefault();
    let word = e.target.word.value.toUpperCase();
    if (this.props.words.has(word)) {
      e.target.word.value = '';
      this.props.pushFound(word);
      this.props.setSelected('');
    }
  },

  validateKey: function(e) {
    if (!e.key.match(/[a-z]/i)) {
      e.preventDefault();
    }
  },

  checkIfEnter: function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.refs.form.dispatchEvent(new Event("submit"));
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
    let char = e.target.innerText;
    let input = document.getElementById('word-input');
    input.value += char;
    let event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  },

  render: function() {
    let buttons = [];
    for (let i = 0; i < 16; i++) {
      buttons.push(
        <button className="btn btn3d btn-white letter" key={i} onKeyPress={this.checkIfEnter}
                data-row={Math.floor(i / 4)} data-col={i % 4} onClick={this.pushLetter}>
          { this.props.letters[i] === 'Q' ? 'Qu' : this.props.letters[i] }
        </button>
      );
    }
    let form;
    if (this.props.start && !this.props.finished) {
      let addon = <span className="input-group-addon danger" title="not a word in the board"><span className="glyphicon glyphicon-remove" /></span>;
      if (this.props.found.has(this.props.selected.toUpperCase())) {
        addon = <span className="input-group-addon warning" title="already found word"><span className="glyphicon glyphicon-warning-sign" /></span>;
      }
      else if (this.props.words.has(this.props.selected.toUpperCase())) {
        addon = <span className="input-group-addon success" title="nice find!"><span className="glyphicon glyphicon-ok" /></span>;
      }
      else if (!this.props.selected) {
        addon = <span className="input-group-addon">...</span>;
      }
      form = (
        <form id="word-form" onSubmit={this.checkIfWordInBoard} ref="form" className="animated slideInLeft">
          <div className="input-group">
            <input className="form-control" id="word-input" type="text" name="word" pattern="[a-zA-Z]+" autoFocus
                   onChange={this.selectWord} onKeyPress={this.validateKey} placeholder="Enter words here!"/>
            { addon }
          </div>
        </form>
      );
    }
    return (
      <div className="board-wrap">
        <div id="board">
          { buttons }
        </div>
        { form }
      </div>
    );
  }

});

function pressSelection(target) {
  target = target.toUpperCase().replace('QU', 'Q');
  let visited = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ];
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      search(y, x, '', [], 0);
    }
  }

  function search(y, x, word, path, depth) {
    let $button = $board.find('[data-row='+ y +'][data-col='+ x + ']');
    path = path.concat($button[0]);
    let nextChar = $button.text();
    nextChar = nextChar === 'Qu' ? 'Q' : nextChar;
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
