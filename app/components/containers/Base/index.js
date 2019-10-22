/* eslint-disable react/no-unused-state */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable complexity */
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Styles from './style';
import { Header as HeaderCard } from '../../cards';

export default class Base extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isKeyboarUp: false,
      showFixedTitle: true,
      isMoreMenuModalVisible: false,
    };

    this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', () => {
      this.setState({ isKeyboarUp: true });
    });

    this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      this.setState({ isKeyboarUp: false });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    this.keyboardWillShow.remove();
    this.keyboardWillHide.remove();
  }

  onContentScrolled(event) {
    const yOffset = event.nativeEvent.contentOffset.y;

    if (this.props.persistScrollTitle) {
      persistScrollOffset = this.props.persistScrollOffset
        ? this.props.persistScrollOffset
        : 45;

      if (yOffset < persistScrollOffset && !this.state.showFixedTitle) {
        this.setState({ showFixedTitle: true });
      }

      if (yOffset >= persistScrollOffset && this.state.showFixedTitle) {
        this.setState({ showFixedTitle: false });
      }
    }

    if (!this.props.onScroll) {
      return null;
    }

    this.props.onScroll(yOffset);
  }

  renderTopColor() {
    if (!this.props.topColor) {
      return null;
    }

    return (
      <View style={Styles.backgroundContent.container}>
        <View
          style={[
            Styles.backgroundContent.content,
            { backgroundColor: this.props.topColor },
          ]}
        />
      </View>
    );
  }

  renderBackgroundContent() {
    if (!this.props.backgroundContent) {
      return null;
    }

    return (
      <View style={Styles.backgroundContent.container}>
        {this.props.backgroundContent}
      </View>
    );
  }

  renderHeader(isFloatingHeader = false) {
    if (
      (!this.props.onBackPress) ||
      (!isFloatingHeader && this.props.floatingHeader) ||
      (isFloatingHeader && !this.props.floatingHeader)
    ) {
      return null;
    }

    return (
      <HeaderCard
        onLeftPress={this.props.onBackPress}
        onRightPress={this.props.onClosePress}
        inverse={this.props.inverse}
        centeredTitle={this.props.centeredTitle}
        title={
          this.props.persistScrollTitle && this.state.showFixedTitle
            ? this.props.persistScrollTitle
            : this.props.title
        }
        floating={isFloatingHeader}
        isModal={this.props.isModal}
      />
    );
  }

  renderMain() {
    const { fixed, children } = this.props;
    if (fixed) {
      return <View style={Styles.innerContainerStatic}>{children}</View>;
    }

    return (
      <ScrollView
        contentContainerStyle={Styles.innerContainer}
        onScroll={event => this.onContentScrolled(event)}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
    );
  }

  renderBottomContent() {
    const { bottomContent } = this.props;
    if (!bottomContent) {
      return null;
    }

    return <View>{bottomContent}</View>;
  }

  render() {
    const { backgroundColor, hasFooter, bottomContent, inverse } = this.props;
    return (
      <SafeAreaView
        style={[
          Styles.container,
          backgroundColor ? { backgroundColor: backgroundColor } : {},
        ]}
        forceInset={{
          bottom: hasFooter || !!bottomContent ? 'always' : 'never',
        }}
      >
        <StatusBar
          translucent
          barStyle={!inverse ? 'dark-content' : 'light-content'}
          backgroundColor="transparent"
        />

        {this.renderTopColor()}

        {this.renderBackgroundContent()}

        {this.renderHeader()}

        <KeyboardAvoidingView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          {this.renderMain()}

          {this.renderBottomContent()}
        </KeyboardAvoidingView>

        {this.renderHeader(true)}
      </SafeAreaView>
    );
  }
}
