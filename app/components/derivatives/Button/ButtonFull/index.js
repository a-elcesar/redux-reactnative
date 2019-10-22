/* eslint-disable complexity */
import React, { Component } from 'react';
import { Colors } from '../../../../configs';
import Text from '../../../generics/Text';
import Button from '../../../generics/Button';

export default class ButtonFull extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    let color = null;

    if (this.props.color) {
      color = this.props.color;
    }

    if (this.props.borderColor) {
      color = this.props.borderColor;
    }

    return (
      <Button
        {...this.props}
        onPress={this.props.onPress}
        height={this.props.height ? this.props.height : 64}
        width={this.props.width}
        paddingHorizontal={this.props.padding ? this.props.padding : 16}
        inverse={this.props.inverse}
        backgroundColor={this.props.backgroundColor}
        borderRadius={this.props.borderRadius}
      >
        <Text
          size={this.props.size ? this.props.size : 16}
          line={this.props.line ? this.props.line : 42}
          letterSpacing={1.6}
          color={
            this.props.inverse || this.props.borderColor
              ? color
                ? color
                : Colors.main.baseBlue
              : Colors.main.baseWhite
          }
        >
          {this.props.children}
        </Text>
      </Button>
    );
  }
}
