const React = require('react');
const Immutable = require('immutable');
const is = Immutable.is;
const _ = {
  groupBy: require('lodash/groupBy'),
};
const ScoreCard = require('./score-card');

const Scores = React.createClass({

  shouldComponentUpdate: function(props) {
    return this.props.words.size !== props.words.size ||
           !is(this.props.found, props.found) ||
           this.props.finished !== props.finished;
  },

  render: function() {
    let foundGroups = _.groupBy([...this.props.found], word => Math.min(word.length, 8));
    let wordGroups = _.groupBy([...this.props.words], word => Math.min(word.length, 8));
    let scoreCards = [];
    let score = 0;
    for (let len in wordGroups) {
      if (foundGroups[len]) {
        score += points[len] * foundGroups[len].length;
      }
      scoreCards.push(<ScoreCard len={len} key={len} found={foundGroups[len] || []} words={wordGroups[len]}
                                 finished={this.props.finished} setSelected={this.props.setSelected} />);
    }
    return (
      <div>
        <h4>Score: { score }</h4>
        { scoreCards }
      </div>
    );
  }
});

const points = {
  '3': 1,
  '4': 1,
  '5': 2,
  '6': 3,
  '7': 5,
  '8': 11
};

module.exports = Scores;
