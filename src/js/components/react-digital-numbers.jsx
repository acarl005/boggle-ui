const React = require('react');

const classes = {
  '0': 'zero',
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  ':': 'dots'
};

function makeStyles(props) {
  let color = props.color || '#cacaca';
  return `
.react-digital-nums{
font-family: Arial;
display: inline-block;
padding:10px;
position:relative;
text-align:center;
border-radius:6px;
box-shadow:0 1px 1px rgba(0,0,0,0.08) inset, 0 1px 1px #2d3642;
}

.react-digital-nums{
background-color:#0f1620;
color:${color};
}

.react-digital-nums .digits div span{
background-color:${color};
border-color:${color};
}

.react-digital-nums .digits div.dots:before,
.react-digital-nums .digits div.dots:after{
background-color:${color};
}


/*-------------------------
  The Digits
--------------------------*/


.react-digital-nums .digits div{
text-align:left;
position:relative;
width: 28px;
height:50px;
display:inline-block;
margin:0 4px;
}

.react-digital-nums .digits div span{
opacity:0;
position:absolute;
-webkit-transition:0.25s;
-moz-transition:0.25s;
transition:0.25s;
}

.react-digital-nums .digits .one span,
.react-digital-nums .digits .two span,
.react-digital-nums .digits .three span,
.react-digital-nums .digits .four span,
.react-digital-nums .digits .five span,
.react-digital-nums .digits .six span,
.react-digital-nums .digits .seven span,
.react-digital-nums .digits .eight span,
.react-digital-nums .digits .nine span {
opacity: 0.15;
}

.react-digital-nums .digits div span:before,
.react-digital-nums .digits div span:after{
content:'';
position:absolute;
width:0;
height:0;
border:5px solid transparent;
}

.react-digital-nums .digits .d1{      height:5px;width:16px;top:0;left:6px;}
.react-digital-nums .digits .d1:before{  border-width:0 5px 5px 0;border-right-color:inherit;left:-5px;}
.react-digital-nums .digits .d1:after{  border-width:0 0 5px 5px;border-left-color:inherit;right:-5px;}

.react-digital-nums .digits .d2{      height:5px;width:16px;top:24px;left:6px;}
.react-digital-nums .digits .d2:before{  border-width:3px 4px 2px;border-right-color:inherit;left:-8px;}
.react-digital-nums .digits .d2:after{  border-width:3px 4px 2px;border-left-color:inherit;right:-8px;}

.react-digital-nums .digits .d3{      height:5px;width:16px;top:48px;left:6px;}
.react-digital-nums .digits .d3:before{  border-width:5px 5px 0 0;border-right-color:inherit;left:-5px;}
.react-digital-nums .digits .d3:after{  border-width:5px 0 0 5px;border-left-color:inherit;right:-5px;}

.react-digital-nums .digits .d4{      width:5px;height:14px;top:7px;left:0;}
.react-digital-nums .digits .d4:before{  border-width:0 5px 5px 0;border-bottom-color:inherit;top:-5px;}
.react-digital-nums .digits .d4:after{  border-width:0 0 5px 5px;border-left-color:inherit;bottom:-5px;}

.react-digital-nums .digits .d5{      width:5px;height:14px;top:7px;right:0;}
.react-digital-nums .digits .d5:before{  border-width:0 0 5px 5px;border-bottom-color:inherit;top:-5px;}
.react-digital-nums .digits .d5:after{  border-width:5px 0 0 5px;border-top-color:inherit;bottom:-5px;}

.react-digital-nums .digits .d6{      width:5px;height:14px;top:32px;left:0;}
.react-digital-nums .digits .d6:before{  border-width:0 5px 5px 0;border-bottom-color:inherit;top:-5px;}
.react-digital-nums .digits .d6:after{  border-width:0 0 5px 5px;border-left-color:inherit;bottom:-5px;}

.react-digital-nums .digits .d7{      width:5px;height:14px;top:32px;right:0;}
.react-digital-nums .digits .d7:before{  border-width:0 0 5px 5px;border-bottom-color:inherit;top:-5px;}
.react-digital-nums .digits .d7:after{  border-width:5px 0 0 5px;border-top-color:inherit;bottom:-5px;}


/* 1 */

.react-digital-nums .digits div.one .d5,
.react-digital-nums .digits div.one .d7{
opacity:1;
}

/* 2 */

.react-digital-nums .digits div.two .d1,
.react-digital-nums .digits div.two .d5,
.react-digital-nums .digits div.two .d2,
.react-digital-nums .digits div.two .d6,
.react-digital-nums .digits div.two .d3{
opacity:1;
}

/* 3 */

.react-digital-nums .digits div.three .d1,
.react-digital-nums .digits div.three .d5,
.react-digital-nums .digits div.three .d2,
.react-digital-nums .digits div.three .d7,
.react-digital-nums .digits div.three .d3{
opacity:1;
}

/* 4 */

.react-digital-nums .digits div.four .d5,
.react-digital-nums .digits div.four .d2,
.react-digital-nums .digits div.four .d4,
.react-digital-nums .digits div.four .d7{
opacity:1;
}

/* 5 */

.react-digital-nums .digits div.five .d1,
.react-digital-nums .digits div.five .d2,
.react-digital-nums .digits div.five .d4,
.react-digital-nums .digits div.five .d3,
.react-digital-nums .digits div.five .d7{
opacity:1;
}

/* 6 */

.react-digital-nums .digits div.six .d1,
.react-digital-nums .digits div.six .d2,
.react-digital-nums .digits div.six .d4,
.react-digital-nums .digits div.six .d3,
.react-digital-nums .digits div.six .d6,
.react-digital-nums .digits div.six .d7{
opacity:1;
}


/* 7 */

.react-digital-nums .digits div.seven .d1,
.react-digital-nums .digits div.seven .d5,
.react-digital-nums .digits div.seven .d7{
opacity:1;
}

/* 8 */

.react-digital-nums .digits div.eight .d1,
.react-digital-nums .digits div.eight .d2,
.react-digital-nums .digits div.eight .d3,
.react-digital-nums .digits div.eight .d4,
.react-digital-nums .digits div.eight .d5,
.react-digital-nums .digits div.eight .d6,
.react-digital-nums .digits div.eight .d7{
opacity:1;
}

/* 9 */

.react-digital-nums .digits div.nine .d1,
.react-digital-nums .digits div.nine .d2,
.react-digital-nums .digits div.nine .d3,
.react-digital-nums .digits div.nine .d4,
.react-digital-nums .digits div.nine .d5,
.react-digital-nums .digits div.nine .d7{
opacity:1;
}

/* 0 */

.react-digital-nums .digits div.zero .d1,
.react-digital-nums .digits div.zero .d3,
.react-digital-nums .digits div.zero .d4,
.react-digital-nums .digits div.zero .d5,
.react-digital-nums .digits div.zero .d6,
.react-digital-nums .digits div.zero .d7{
opacity:1;
}


/* The dots */

.react-digital-nums .digits div.dots{
width:5px;
}

.react-digital-nums .digits div.dots:before,
.react-digital-nums .digits div.dots:after{
width:5px;
height:5px;
content:'';
position:absolute;
left:0;
top:14px;
}

.react-digital-nums .digits div.dots:after{
top:34px;
}

/*-------------------------
  AM/PM
--------------------------*/


.react-digital-nums .units{
position:relative;
font-size:12px;
display:inline-block;
}
  `;
}

const Digit = React.createClass({
  render: function() {
    return (
      <div className={this.props.digit}>
        <span className="d1"></span>
        <span className="d2"></span>
        <span className="d3"></span>
        <span className="d4"></span>
        <span className="d5"></span>
        <span className="d6"></span>
        <span className="d7"></span>
      </div>
    );
  }
});

const DigitalNumbers = React.createClass({

  render: function() {
    let nums = this.props.numbers;
    let display = [], i = 0;
    for (let digit of nums) {
      display.push(<Digit digit={classes[digit]} key={i++}/>);
    }
    return (
      <div className="react-digital-nums">
        <style dangerouslySetInnerHTML={{ __html: makeStyles(this.props) }} />
        <div className="digits">
          { display }
          <section className="units">
            { this.props.units }
          </section>
        </div>
      </div>
    );
  }

});

module.exports = DigitalNumbers;
