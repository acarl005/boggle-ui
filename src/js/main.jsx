window.jQuery = window.$ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');
const io = require('socket.io-client');
const qs = require('querystring');
const Immutable = require('immutable');

const socket = io();

const Controls = require('./components/controls');
const Board = require('./components/board');
const Scores = require('./components/scores');

const Game = React.createClass({

  getInitialState: function() {
    return {
      letters: '',
      selected: '',
      words: Immutable.Set(),
      found: Immutable.Set(),
      start: null,
    };
  },

  setSelected: function(selected) {
    this.setState({ selected });
  },

  pushFound: function(newWord) {
    var newFound = this.state.found.add(newWord);
    this.setState({ found: newFound });
  },

  componentWillMount: function() {
    let query = qs.parse(location.search.slice(1));
    socket.emit('start', query.board);
    socket.on('letters', letters => this.setState({ letters }));
    socket.on('solution', words => this.setState({ words: Immutable.Set(words) }));
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Controls { ...this.state } />
          <Board { ...this.state } setSelected={this.setSelected} pushFound={this.pushFound} />
        </div>
        <div className="col-md-6">
          <Scores { ...this.state } />
        </div>
      </div>
    );
  }

});


ReactDOM.render(<Game />, document.getElementById('content'));


// function validate(e) {
//   if (e.keyCode === 13) return; // press enter to submit form
//   var char = String.fromCharCode(e.charCode);
//   if (!char.match(/[a-z]/i)) { // prevent them from entering things that aren't letters
//     e.preventDefault();
//   }
// }
//
// function checkIfWord(e) {
//   e.preventDefault();
//   var word = e.target.word.value.toUpperCase();
//   var index = game.words.indexOf(word);
//   if (index !== -1) {
//     addWord(word);
//     game.words.splice(index, 1);
//   }
// }
//
// function addWord(word) {
//   $('<p/>', { text: word }).appendTo('.words');
//   $('#word-input').val('');
// }


// function insertLetter(e) {
//   var char = e.target.innerText;
//   var $input = $('#word-input');
//   $input[0].value += char;
//   $input.trigger('keyup');
// }
//
// function populatePercentageBars() {
//   console.log(game.words);
// }
