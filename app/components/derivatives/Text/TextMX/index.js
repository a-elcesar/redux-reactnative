/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Text from '../../../generics/Text';
import { Sizes } from '../../../../configs';

export default class TextMX extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    const { children } = this.props;
    return (
      <Text
        size={Sizes.text.m.size}
        line={Sizes.text.m.line}
        bold
        {...this.props}
      >
        {children}
      </Text>
    );
  }
}
