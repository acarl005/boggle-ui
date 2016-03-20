const React = require('react');
const Clock = require('./clock');

const Controls = React.createClass({

  render: function() {
    let button;
    if (this.props.finished) {
      button = (
        <button id="start" className="btn btn3d btn-primary btn-lg" onClick={this.props.startGame}>
          <span className="glyphicon glyphicon-time"></span>
          {' '}Start
        </button>
      );
    } else {
      button = (
        <button id="start" className="btn btn3d btn-danger btn-lg" onClick={() => this.props.setFinished(true)}>
          <span className="glyphicon glyphicon-time"></span>
          {' '}Answers
        </button>
      );
    }
    return (
      <div className="controls">
        { button }
        <Clock start={this.props.start} setFinished={this.props.setFinished} finished={this.props.finished} />
      </div>
    );
  }
});

module.exports = Controls;
