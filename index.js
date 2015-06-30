'use strict';

var React = require('react'),
  sprintf = require('sprintf'),
  Arrow = require('./components/arrow'),
  intervalId;

require('./app.css');

module.exports = React.createClass({

  displayName: 'React Horizontal Scroll',

  propTypes: {
    children: React.PropTypes.element,
    className: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      offset: 0,
      width: 0,
      height: 0,
      offsetLeft: 0,
      offsetTop: 0,
      scrollLeft: 0,
      scrollWidth: 0,
      canScrollLeft: false,
      canScrollRight: false
    };
  },

  componentDidMount: function () {
    var element = this.getDOMNode();

    this.setState({
      height: element.offsetHeight,
      width: element.offsetWidth,
      offsetLeft: element.offsetLeft,
      offsetTop: element.offsetTop
    });

    intervalId = setInterval(function () {
      this.setScrollState();
    }.bind(this), 250);

    element.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  },

  componentWillUnmount: function () {
    var element = this.getDOMNode();

    if (intervalId) {
      clearInterval(intervalId);
    }

    element.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  },

  componentDidUpdate: function () {
    var target = this.getDOMNode(),
      offset = this.state.offset,
      position = offset || 0;

    target.scrollLeft = position;
  },

  onScroll: function (event) {
    var offset = event.target.scrollLeft;
    this.setScrollState(offset);
  },

  onResize: function () {
    this.setScrollState();
  },

  setScrollState: function (offset) {
    var element = this.getDOMNode(),
      scrollWidth = element.scrollWidth,
      canScrollRight = false;

    if (offset === undefined) {
      offset = this.state.offset;
    }

    if (element.scrollLeft < (element.scrollWidth - element.offsetWidth)) {
      canScrollRight = true;
    }

    if (!element.scrollLeft && !(element.scrollWidth - element.offsetWidth)) {
      canScrollRight = true;
    }

    this.setState({
      height: element.offsetHeight,
      width: element.offsetWidth,
      offset: Math.floor(offset),
      scrollLeft: element.scrollLeft,
      scrollWidth: scrollWidth,
      offsetLeft: element.offsetLeft,
      offsetTop: element.offsetTop,
      canScrollLeft: offset > 0,
      canScrollRight: canScrollRight
    });
  },

  scrollLeft: function () {
    var element = this.getDOMNode(),
      offset = element.scrollLeft - element.scrollWidth * 0.15;

    this.setScrollState(offset);
  },

  scrollRight: function () {
    var element = this.getDOMNode(),
      offset = element.scrollLeft + element.scrollWidth * 0.15;

    this.setScrollState(offset);
  },

  render: function () {
    var body = document.body,
      className = 'horizontal-scrolling',
      windowInnerHeight = window.innerHeight,

      offsetTop = this.state.offsetTop,
      offsetLeft = this.state.offsetLeft,

      height = this.state.height,
      width = this.state.width,

      scrollWidth = this.state.scrollWidth,
      scrollTop = body.scrollTop,

      offset = offset > 0 ? offset : 0,

      bottom = Math.min(offsetTop + height, scrollTop + windowInnerHeight),
      top = Math.max(offsetTop, scrollTop),
      left = offsetLeft,
      right = offsetLeft + width - 60,

      canScrollLeft = this.state.canScrollLeft,
      canScrollRight = this.state.canScrollRight;

    top = (bottom - top - 70 / 2) / 2 + top; // 70px arrow height

    if (offsetTop >= windowInnerHeight || offsetTop + height < scrollTop) {
      canScrollLeft = false;
      canScrollRight = false;
    }

    if (scrollWidth <= width) {
      canScrollLeft = false;
      canScrollRight = false;
    }

    if (this.props.className) {
      className = sprintf('%s %s', className, this.props.className);
    }

    return (
      <div className={className}>
        <Arrow
          onClick={this.scrollLeft}
          show={canScrollLeft}
          top={top}
          left={left} />
        <Arrow
          onClick={this.scrollRight}
          show={canScrollRight}
          top={top}
          left={right}
          direction='right' />
        {this.props.children}
      </div>
    );
  }

});
