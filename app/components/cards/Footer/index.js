import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Base extends Component {
  shouldComponentUpdate() {}

  render() {
    return (
      <View>
        <Text>{this.props.footer}</Text>
      </View>
    );
  }
}
