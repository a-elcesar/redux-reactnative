/* eslint-disable react-native/no-color-literals */
/* eslint-disable complexity */
import React, { Component } from 'react';
import {
  TouchableOpacity as RButton,
  Animated,
  Platform,
  Easing,
} from 'react-native';
import { Colors } from '../../../configs';
import Styles from './style';

export default class Button extends Component {
  constructor(props) {
    super(props);

    const maxOpacity = 0.12;

    this.state = {
      maxOpacity,
      scaleValue: new Animated.Value(0.01),
      opacityValue: new Animated.Value(maxOpacity),
      locationX: 0,
      locationY: 0,
      R: 0,
    };

    this.renderRippleView = this.renderRippleView.bind(this);
    this.onPressedIn = this.onPressedIn.bind(this);
    this.onPressedOut = this.onPressedOut.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  onPressedIn(event) {
    const { scaleValue } = this.state;
    const { locationX, locationY } = event.nativeEvent;

    const w2 = 0.5 * this.props.width;
    const h2 = 0.5 * this.props.height;

    const offsetX = Math.abs(w2 - locationX);
    const offsetY = Math.abs(h2 - locationY);

    const R = Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.out(Easing.ease),
      useNativeDriver: Platform.OS === 'android',
    });
    this.setState({ locationX, locationY, R });
  }

  onPressedOut() {
    const { opacityValue, scaleValue, maxOpacity } = this.state;
    Animated.timing(opacityValue, {
      toValue: 0,
      useNativeDriver: Platform.OS === 'android',
    }).start(() => {
      scaleValue.setValue(0.01);
      opacityValue.setValue(maxOpacity);
    });
  }

  getComposedStyle() {
    const composedStyle = [Styles.main];
    const newStyle = {};

    if (this.props.color) {
      newStyle.backgroundColor = this.props.color;
      newStyle.borderColor = this.props.color;
    }

    if (this.props.borderColor) {
      newStyle.borderColor = this.props.borderColor;
    }

    if (this.props.borderRadius) {
      newStyle.borderRadius = this.props.borderRadius;
    }

    if (this.props.inverse) {
      newStyle.backgroundColor = 'transparent';
      newStyle.borderColor = this.props.color
        ? this.props.color
        : Colors.main.baseRed;
    }

    if (this.props.height) {
      newStyle.height = this.props.height;
    }

    if (this.props.width) {
      newStyle.width = this.props.width;
    }

    if (this.props.paddingHorizontal) {
      newStyle.paddingHorizontal = this.props.paddingHorizontal;
    }

    if (this.props.paddingVertical) {
      newStyle.paddingVertical = this.props.paddingVertical;
    }

    if (this.props.padding) {
      newStyle.padding = this.props.padding;
    }

    if (this.props.paddingBottom) {
      newStyle.paddingBottom = this.props.paddingBottom;
    }

    if (this.props.backgroundColor) {
      newStyle.backgroundColor = this.props.backgroundColor;
    }

    composedStyle.push(newStyle);

    return composedStyle;
  }

  renderRippleView() {
    const { scaleValue, opacityValue, locationX, locationY, R } = this.state;

    return (
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          top: locationX - 10,
          left: locationY - 10,
          width: 20,
          height: 20,
          transform: [
            {
              scale: scaleValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5 / 10, R / 10],
              }),
            },
          ],
          backgroundColor: 'black',
          opacity: opacityValue,
        }}
      />
    );
  }

  render() {
    return (
      <RButton
        {...this.props}
        style={this.getComposedStyle()}
        onPress={this.props.onPress ? () => this.props.onPress() : () => {}}
      >
        {this.props.children}
      </RButton>
    );
  }
}
