const React = require('react');

const ScoreCard = React.createClass({

  render: function() {
    var labels = this.props.found.map((word, i) => {
      return <span className="label label-warning" key={i}>{ word } </span>;
    });
    return (
      <div className="panel">
        <div className="panel-heading">
          { this.props.len }-letter
        </div>
        <div className="panel-body">
          { labels }
        </div>
      </div>
    );
  }

});

module.exports = ScoreCard;
