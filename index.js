'use strict';

var React = require('react'),
  Arrow = require('components/arrow');

require('./app.css');

module.exports = React.createClass({

  getInitialState: function () {
    return {
      offset: 0,
      width: 0,
      height: 0,
      scrollWidth: 0,
      canScrollLeft: false,
      canScrollRight: true
    };
  },

  componentDidMount: function() {
    this.setState({
      height: this.getDOMNode().offsetHeight,
      width: this.getDOMNode().offsetWidth
    });

    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  componentDidUpdate: function () {
    var target = this.getDOMNode(),
      offset = this.state.offset,
      position = offset || 0;

    target.scrollLeft = position;
  },

  handleResize: function(e) {
    this.setScrollState();
  },

  setScrollState: function (offset) {
    var element = this.getDOMNode(),
      scrollWidth = element.scrollWidth;

    if (offset === undefined) {
      offset = this.state.offset;
    }

    this.setState({
      offset: Math.floor(offset),
      scrollWidth: scrollWidth,
      canScrollLeft: offset > 0,
      canScrollRight: offset < scrollWidth
    });
  },

  scrollLeft: function (event) {
    var element = this.getDOMNode(),
      offset = element.scrollLeft - element.scrollWidth * 0.15;

    this.setScrollState(offset);
  },

  scrollRight: function (event) {
    var element = this.getDOMNode(),
      offset = element.scrollLeft + element.scrollWidth * 0.15;

    this.setScrollState(offset);
  },

  render: function () {
    var width = this.state.width,
      scrollWidth = this.state.scrollWidth,
      offset = this.state.offset > 0 ? this.state.offset : 0,
      top = (this.state.height / 2) - 35, // 70px height for button
      left = offset,
      right = offset + this.state.width - 60; // 60px width for button

    if (left > (scrollWidth - width)) {
      left = scrollWidth - width;
    }

    return (
      <div className='horizontal-scrolling'>
        <Arrow
          onClick={this.scrollLeft}
          show={this.state.canScrollLeft}
          top={top}
          left={left} />
        <Arrow
          onClick={this.scrollRight}
          show={this.state.canScrollRight}
          top={top}
          left={right}
          direction='right'  />
        {this.props.children}
      </div>
    );
  }

});