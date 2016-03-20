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
      finished: true,
    };
  },

  setSelected: function(selected) {
    this.setState({ selected });
  },

  pushFound: function(newWord) {
    var newFound = this.state.found.add(newWord);
    this.setState({ found: newFound });
  },

  startGame: function() {
    let query = qs.parse(location.search.slice(1));
    if (query.board && query.board.length !== 16) delete query.board;
    socket.emit('start', query.board);
    this.setState({ start: Date.now(), found: Immutable.Set(), finished: false });
  },

  setFinished: function(finished) {
    if (finished)
    this.setState({ finished });
  },

  componentWillMount: function() {
    socket.on('letters', letters => this.setState({ letters }));
    socket.on('solution', words => this.setState({ words: Immutable.Set(words) }));
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-7">
          <Controls { ...this.state } startGame={this.startGame} setFinished={this.setFinished} />
          <Board { ...this.state } setSelected={this.setSelected} pushFound={this.pushFound} />
        </div>
        <div className="col-md-6 col-sm-5">
          <Scores { ...this.state } setSelected={this.setSelected} />
        </div>
      </div>
    );
  }

});


ReactDOM.render(<Game />, document.getElementById('content'));
