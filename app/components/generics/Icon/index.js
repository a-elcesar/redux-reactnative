import React, { Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Styles from './style';

export default class Icon extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  getComposedStyle() {
    const composedStyle = [Styles.main];
    const newStyle = {};

    if (this.props.color) {
      newStyle.color = this.props.color;
    }

    if (this.props.size) {
      newStyle.fontSize = this.props.size;
    }

    if (this.props.align) {
      newStyle.textAlign = this.props.align;
    }

    composedStyle.push(newStyle);
    composedStyle.push(this.props.style);

    return composedStyle;
  }

  render() {
    return (
      <MaterialIcons {...this.props} style={this.getComposedStyle()}>
        {this.props.children}
      </MaterialIcons>
    );
  }
}
