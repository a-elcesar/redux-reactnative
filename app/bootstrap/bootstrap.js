import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import { View } from 'react-native';
import { connect } from 'react-redux';

class Bootstrap extends Component {
  constructor(properties) {
    super(properties);

    OneSignal.init('962a5588-f376-4d84-bd88-e60507ec65f1');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = notification => {
    console.log(notification);
  };

  onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  onIds = device => {
    console.log('device: ', device);
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    return <View style={styles.container}>{children}</View>;
  }
}

const styles = {
  container: {
    flex: 1,
  },
};

const mapDispatchToProps = () => ({});

export default connect(
  null,
  mapDispatchToProps
)(Bootstrap);
