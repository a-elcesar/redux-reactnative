import React, { PureComponent } from 'react';
import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../configs';

export default class LoadingModal extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
  };

  render() {
    const { loading } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={loading}
        onRequestClose={() => {}}
      >
        <View style={styles.fullModal}>
          <ActivityIndicator color={Colors.main.baseBlue} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  fullModal: {
    alignItems: 'center',
    backgroundColor: Colors.main.baseBlack,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    opacity: 0.5,
  },
});
