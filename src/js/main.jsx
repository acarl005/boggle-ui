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
      selected: '',
      words: [],
      found: [],
      start: null,
    };
  },

  setSelected: function(selected) {
    this.setState({ selected });
  },

  componentWillMount: function() {
    var query = qs.parse(location.search.slice(1));
    socket.emit('start', query.board);
    socket.on('letters', letters => this.setState({ letters }));
    socket.on('solution', words => this.setState({ words }));
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Controls { ...this.state } />
          <Board { ...this.state } setSelected={this.setSelected} />
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
