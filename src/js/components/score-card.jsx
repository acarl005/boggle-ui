const React = require('react');

const ScoreCard = React.createClass({

  render: function() {
    let foundLabels = [];
    this.props.found.forEach((word, i) => {
      foundLabels.push(<span className="label label-warning" key={i}>{ word }</span>, ' ');
    });
    let wordLabels = [];
    if (this.props.finished) {
      this.props.words.forEach((word, i) => {
        if (this.props.found.indexOf(word) === -1) {
          wordLabels.push(<span className="label label-default" key={i}>{ word }</span>, ' ');
        }
      });
    }
    let percent = Math.floor(this.props.found.length / this.props.words.length * 100);
    return (
      <div className="panel score-card">
        <div className="panel-heading">
          { this.props.len }-letter
        </div>
        <div className="panel-body">
          <div className="progress">
            <div className="progress-bar progress-bar-primary" role="progressbar" style={{ width: percent + '%' }}>
              { percent }%
            </div>
          </div>
          { foundLabels }
          { wordLabels }
        </div>
      </div>
    );
  }

});

module.exports = ScoreCard;
