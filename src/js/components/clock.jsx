const React = require('react');
const DigitalNumbers = require('./react-digital-numbers');
let pid, prevTick;

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
    // this is a weird looking timeout right? shouldn't it just be 1000ms? If you set it to 1000 then it will be around 1002 to 1006 because it has to wait for the event loop.
    // I'm correcting for this by measuring how long it was since the previous tick, so if it took 1006ms the previous time, wait only 994ms this time.
    let timeout;
    let timeDiff = Date.now() - prevTick;
    if (timeDiff > 1000) {
      timeout = 2000 - timeDiff;
    } else {
      timeout = 1000;
    }
    prevTick = Date.now();
    pid = setTimeout(() => {
      pid = null;
      this.setState({ remaining: this.state.remaining - 1000 });
    }, timeout);
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
