/* eslint-disable complexity */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconRipple from '../../derivatives/Icon/IconRipple';
import { TextMX, TextM } from '../../derivatives/Text';
import Styles from './style';
import { Colors, Sizes } from '../../../configs';

export default class Base extends Component {
  static propTypes = {
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,
    inverse: PropTypes.bool,
    floating: PropTypes.bool,
    noPadding: PropTypes.bool,
    isModal: PropTypes.bool,
    centeredTitle: PropTypes.bool,
    title: PropTypes.any,
  };

  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  renderLeftButton() {
    const { onLeftPress, inverse } = this.props;
    if (!onLeftPress) {
      return null;
    }

    return (
      <IconRipple
        onPress={onLeftPress ? () => onLeftPress() : () => {}}
        name="arrow-back"
        size={24}
        color={!inverse ? Colors.main.baseBlue : Colors.main.baseWhite}
      />
    );
  }

  renderRightButton() {
    const { onRightPress, inverse } = this.props;
    if (!onRightPress) {
      return null;
    }

    return (
      <TouchableOpacity
        style={[Styles.button.container, { alignItems: 'flex-end' }]}
        onPress={onRightPress ? () => onRightPress() : () => {}}
      >
        <Icon
          name="close"
          color={!inverse ? Colors.main.baseBlack : Colors.main.baseWhite}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const {
      floating,
      noPadding,
      isModal,
      inverse,
      title,
      onLeftPress,
      centeredTitle,
    } = this.props;
    return (
      <View
        style={[
          Styles.grouper,
          floating
            ? {
                position: 'absolute',
                top: Sizes.isIphoneX ? 44 : isModal && Sizes.isAndroid ? 0 : 20,
              }
            : {},
          noPadding ? { paddingVertical: 0 } : {},
          !onLeftPress ? { paddingVertical: 8 } : {}
        ]}
      >
        {this.renderLeftButton()}

        <View
          style={[
            Styles.title.container,
            centeredTitle ? Styles.title.centeredTitle : {},
          ]}
        >
          {centeredTitle ? (
            <TextM
              style={{ marginLeft: -48 }}
              letterSpacing={1.2}
              color={inverse ? Colors.main.baseWhite : Colors.main.baseBlack}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {title}
            </TextM>
          ) : (
            <TextMX
              color={inverse ? Colors.main.baseWhite : Colors.main.baseFont}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {title}
            </TextMX>
          )}
        </View>

        {this.renderRightButton()}
      </View>
    );
  }
}
