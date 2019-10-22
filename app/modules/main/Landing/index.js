import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Styles from './style';

export default class Landing extends Component {
  shouldComponentUpdate() {}

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <View
            style={{
              backgroundColor: 'yellow',
              width: 80,
              height: 80,
              borderTopWidth: 2,
              borderTopColor: "blue",
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
        <View style={{ backgroundColor: 'blue', width: 80, height: 80 }} />
        <View style={{ backgroundColor: 'red', width: 80, height: 80 }} />
      </View>
    );
  }
}
