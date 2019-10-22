/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Text as RText, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Styles from './style';

export default class Text extends Component {
  static propTypes = {
    color: PropTypes.string,
    animated: PropTypes.bool,
    children: PropTypes.any,
    size: PropTypes.number,
    line: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  getComposedStyle() {
    const composedStyle = [Styles.main];
    const newStyle = {};
    const {
      color,
      size,
      line,
      align,
      bold,
      light,
      style,
      letterSpacing,
    } = this.props;

    if (color) {
      newStyle.color = color;
    }

    if (size) {
      newStyle.fontSize = size;
    }

    if (line) {
      newStyle.lineHeight = line;
    }

    if (align) {
      newStyle.textAlign = align;
    }

    if (letterSpacing) {
      newStyle.letterSpacing = letterSpacing;
    }

    if (bold) {
      newStyle.fontWeight = 'bold';
    }

    if (light) {
      newStyle.fontWeight = '300';
    }

    composedStyle.push(newStyle);
    composedStyle.push(style);

    return composedStyle;
  }

  render() {
    const { animated, children } = this.props;
    if (animated) {
      return (
        <Animated.Text {...this.props} style={this.getComposedStyle()}>
          {children}
        </Animated.Text>
      );
    }

    return (
      <RText {...this.props} style={this.getComposedStyle()}>
        {children}
      </RText>
    );
  }
}
