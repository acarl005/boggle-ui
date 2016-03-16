var React = require('react');

var Board = React.createClass({
  render: function() {
    var buttons = [];
    for (var i = 0; i < 16; i++) {
      buttons.push(
        <button className="btn btn3d btn-white letter"
                dataRow={Math.floor(i / 4)} dataCol={i % 4}>
          {this.props.letters[i]}
        </button>
      );
    }
    return (
      <div>
        <div id="board">
          { buttons }
        </div>
      </div>
    );
  }
});
