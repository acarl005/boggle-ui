var React = require('react');

var Controls = React.createClass({
  render: function() {
    return (
      <button id="start" className="btn btn3d btn-primary">
        <span className="glyphicon glyphicon-time"></span>
        Start
      </button>
    );
  }
});

module.exports = Controls;
