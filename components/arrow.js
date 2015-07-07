'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Arrow',

  propTypes: {
    direction: React.PropTypes.string,
    show: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func,
    top: React.PropTypes.number,
    left: React.PropTypes.number
  },

  render: function () {
    var direction = this.props.direction || 'left',
      className = 'horizontal-scrolling-' + direction,
      top = this.props.top || 0,
      left = this.props.left || 0,
      style = { top: top, left: left };

    return this.props.show ?
      <div
        className={className}
        onClick={this.props.onClick}
        style={style} /> :
      null;
  }
});
