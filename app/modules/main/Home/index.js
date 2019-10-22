import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Styles from './style';

export default class Home extends Component {
  shouldComponentUpdate() {}

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text>Home</Text>
      </View>
    );
  }
}
