import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import {
  Base as BaseContainer,
  Padder as PadderContainer,
} from '../../../components/containers';
import { Colors, Sizes } from '../../../configs';
import { TextM } from '../../../components/derivatives/Text';
import ButtonFull from '../../../components/derivatives/Button/ButtonFull';
import { InputString } from '../../../components/derivatives/Input';
import Styles from './style';
import i18n from '../../../utils/i18n';
import LoadingModal from '../../../modals';
import { login } from '../authActions';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../authConstants';

class Login extends Component {
  static propTypes = {
    action: PropTypes.string,
    login: PropTypes.func,
    loginFetch: PropTypes.bool,
    deviceId: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email_or_phone: 'frandisag@gmail.com',
        password: '32831307',
      },
      error: {
        email_or_phone: '',
        password: '',
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { action, navigation } = this.props;
    if (prevProps.action !== action) {
      switch (action) {
        case LOGIN_SUCCESS:
          navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Main' })],
            })
          );
          break;
        case LOGIN_FAILED:
          Toast.show(i18n.t('server_busy'), Toast.LONG);
          break;
        default:
      }
    }
  }

  onSubmit() {
    const { formData, error } = this.state;
    const { login, deviceId } = this.props;
    if (formData.email_or_phone === '') {
      this.setState({
        error: {
          ...error,
          email_or_phone: i18n.t('Cannot_be_Empty'),
        },
      });
      return false;
    }
    if (formData.password === '') {
      this.setState({
        error: { ...error, password: i18n.t('Cannot_be_Empty') },
      });
      return false;
    }

    const sendData = {
      email: formData.email_or_phone,
      password: formData.password,
      device_token: deviceId,
    };

    login(sendData);
    return true;
  }

  onChangeText(label, value) {
    const { error, formData } = this.state;
    if (value !== '') {
      this.setState({
        formData: { ...formData, [`${label}`]: value },
        error: { ...error, [`${label}`]: '' },
      });
    } else {
      this.setState({
        formData: { ...formData, [`${label}`]: '' },
        error: { ...error, [`${label}`]: i18n.t('Cannot_be_Empty') },
      });
    }
  }

  renderTitleBody() {
    return (
      <PadderContainer>
        <TextM style={Styles.main.title}>
          {i18n.t('Hi_welcome_back_Please_fill_your_login_details')}
        </TextM>
      </PadderContainer>
    );
  }

  renderForm() {
    const { error, formData } = this.state;
    return (
      <PadderContainer style={Styles.main.padder}>
        <InputString
          label={i18n.t('Phone_Number_or_Email')}
          value={formData.email_or_phone}
          keyboardType="email-address"
          onChangeText={value => this.onChangeText('email_or_phone', value)}
          style={Styles.input.email}
          error={error.email_or_phone}
        />
        <InputString
          secureTextEntry
          label={i18n.t('Enter_Password')}
          value={formData.password}
          onChangeText={value => this.onChangeText('password', value)}
          style={Styles.input.password}
          error={error.password}
        />
      </PadderContainer>
    );
  }

  renderButton() {
    return (
      <ButtonFull
        height={59}
        size={Sizes.text.m.size}
        line={Sizes.text.m.line}
        width={Sizes.screen.width}
        onPress={this.onSubmit}
        color={Colors.main.baseBlue}
        borderColor={Colors.main.baseWhite}
      >
        {i18n.t('SIGN_IN')}
      </ButtonFull>
    );
  }

  render() {
    const { loginFetch, navigation } = this.props;
    return (
      <BaseContainer
        title="Hi, welcome back! Please fill your login details"
        onBackPress={() => navigation.pop()}
        backgroundColor={Colors.main.baseWhite}
        topColor={Colors.main.baseWhite}
        bottomContent={this.renderButton()}
        persistScrollTitle
      >
        {this.renderTitleBody()}
        {this.renderForm()}
        <LoadingModal loading={loginFetch} />
      </BaseContainer>
    );
  }
}

const mapStateToProps = state => ({
  action: state.auth.action,
  loginFetch: state.auth.loginFetch,
  deviceId: state.session.deviceId,
});

const mapDispatchToProps = {
  login: payload => login(payload),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
