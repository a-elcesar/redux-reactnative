import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import { Sizes } from '../../../configs';

export default class VerticalAnimator extends Component {
  static propTypes = {
    order: PropTypes.number,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {
      position: new Animated.Value(Sizes.screen.height),
      hasSlide: false,
    };
  }

  componentDidMount() {
    if (!this.state.hasSlide) {
      Animated.timing(this.state.position, {
        toValue: 0,
        speed: 3,
        bounciness: 2,
        duration: 300,
        delay: !this.props.order ? 100 : this.props.order * 30,
      }).start();

      this.setState({
        hasSlide: true,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState || this.props != nextProps;
  }

  render() {
    const style = [];
    style.push({
      top: this.state.position,
      // opacity: .5,
    });

    return <Animated.View style={style}>{this.props.children}</Animated.View>;
  }
}
