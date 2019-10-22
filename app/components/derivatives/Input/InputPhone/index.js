/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Colors, Sizes } from '../../../../configs';
import Styles from './style';

import { TextS } from '../../Text';
import Input from '../../../generics/Input';
import Text from '../../../generics/Text';
import Icon from '../../../generics/Icon';

export default class InputPhone extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  updateValue(value) {
    this.setState({ value });

    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }
  }

  renderError() {
    if (!this.props.error) {
      return null;
    }

    return <TextS color={Colors.main.errorRed}>{this.props.error}</TextS>;
  }

  renderHint() {
    if (!this.props.hint) {
      return null;
    }

    return (
      <TextS color={Colors.main.baseGray} light style={Styles.hint}>
        {this.props.hint}
      </TextS>
    );
  }

  renderLeftIcon() {
    if (!this.props.leftIcon) {
      return null;
    }

    return (
      <View style={Styles.left.container}>
        <View style={Styles.left.icon.container}>
          <Icon name={this.props.leftIcon} color={Colors.main.baseBlack} />
        </View>
      </View>
    );
  }

  renderRightButton() {
    if (!this.props.rightIcon) {
      return null;
    }

    const main = (
      <View style={[Styles.left.icon.container, { alignItems: 'flex-end' }]}>
        <Icon
          name={this.props.rightIcon}
          color={
            this.props.rightIconColor
              ? this.props.rightIconColor
              : Colors.main.baseRed
          }
        />
      </View>
    );

    if (this.props.onRightIconPress) {
      return (
        <TouchableOpacity
          style={Styles.left.container}
          onPress={() => this.props.onRightIconPress()}
        >
          {main}
        </TouchableOpacity>
      );
    }

    return <View style={Styles.left.container}>{main}</View>;
  }

  render() {
    return (
      <View style={[this.props.style]}>
        <View
          style={[
            Styles.topContainer,
            {
              borderColor: this.props.error
                ? Colors.main.errorRed
                : Colors.main.borderInput,
              marginTop: 20,
            },
          ]}
        >
          {this.renderLeftIcon()}

          <View style={Styles.right.container}>
            <Text
              color={Colors.main.baseGray}
              size={Sizes.text.ss.size}
              line={Sizes.text.ss.line}
            >
              {this.props.label}
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <View
                style={[
                  Styles.input.border,
                  {
                    borderColor: this.props.error
                      ? Colors.main.baseBlue
                      : Colors.main.borderInput,
                    marginRight: 16,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={this.props.onSelectCountry}
                  style={[
                    Styles.right.input,
                    {
                      justifyContent: 'center',
                    },
                  ]}
                >
                  <Text style={{ fontSize: 16, lineHeight: 36 }}>{this.props.phoneCode}</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  Styles.input.border,
                  {
                    borderColor: this.props.error
                      ? Colors.main.baseBlue
                      : Colors.main.borderInput,
                    flex: 1,
                  },
                ]}
              >
                <Input
                  {...this.props}
                  onChangeText={value => this.updateValue(value)}
                  style={Styles.right.input}
                />
              </View>
            </View>
          </View>

          {this.renderRightButton()}
        </View>

        {this.renderError()}

        {this.renderHint()}
      </View>
    );
  }
}
