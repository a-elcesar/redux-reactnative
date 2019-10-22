import React, { PureComponent } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

class IconRipple extends PureComponent {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    name: PropTypes.string,
    onPress: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    const maxOpacity = 0.12;

    this.state = {
      maxOpacity,
      scaleValue: new Animated.Value(0.01),
      opacityValue: new Animated.Value(maxOpacity),
    };

    this.renderRippleView = this.renderRippleView.bind(this);
    this.onPressedIn = this.onPressedIn.bind(this);
    this.onPressedOut = this.onPressedOut.bind(this);
  }

  onPressedIn() {
    const { scaleValue } = this.state;
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start();
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

  renderRippleView() {
    const { size, color } = this.props;
    const { scaleValue, opacityValue } = this.state;

    const rippleSize = size * 2;

    return (
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: rippleSize,
          height: rippleSize,
          borderRadius: rippleSize / 2,
          transform: [{ scale: scaleValue }],
          backgroundColor: color || 'black',
          opacity: opacityValue,
        }}
      />
    );
  }

  render() {
    const { name, size, color, onPress } = this.props;
    const containerSize = size * 2;
    const iconContainer = {
      width: containerSize,
      height: containerSize,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: -16,
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressedIn}
        onPressOut={this.onPressedOut}
        onPress={onPress}
      >
        <View style={iconContainer}>
          {this.renderRippleView()}
          <View>
            <Icon name={name} size={size} color={color} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default IconRipple;
