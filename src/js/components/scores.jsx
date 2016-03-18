var React = require('react');

var Scores = React.createClass({
  render: function() {
    return (
      <div className="col-md-6">
        { this.props.found }
      </div>
    );
  }
});

module.exports = Scores;
