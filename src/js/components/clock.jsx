const React = require('react');
const DigitalNumbers = require('./react-digital-numbers');
let pid;

const Clock = React.createClass({

  getInitialState: function() {
    return { remaining: 180000 };
  },

  componentDidUpdate: function() {
    if (!this.props.start || pid) return;
    if (this.props.finished) {
      this.setState({ remaining: 180000 });
    }
    if (this.state.remaining <= 0) {
      this.props.setFinished(true);
      return pid = null;
    }
    pid = setTimeout(() => {
      pid = null;
      this.setState({ remaining: this.state.remaining - 1000 });
    }, 1000);
  },

  render: function() {
    return (
      <div className="clock">
        <DigitalNumbers numbers={milliToTime(this.state.remaining)} color="red" />
      </div>
    );
  }

});

module.exports = Clock;

function milliToTime(milli) {
  let seconds = milli / 1000;
  let minutes = Math.floor(seconds / 60).toString();
  seconds = Math.floor(seconds % 60).toString();
  if (seconds.length === 1) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds;
}
