import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import {
  Base as BaseContainer,
  Padder as PadderContainer,
} from '../../../components/containers';
import { Colors, Sizes } from '../../../configs';
import { TextM } from '../../../components/derivatives/Text';
import ButtonFull from '../../../components/derivatives/Button/ButtonFull';
import { InputString, InputPhone } from '../../../components/derivatives/Input';
import Styles from './style';
import i18n from '../../../utils/i18n';
import LoadingModal from '../../../modals';
import {
  SET_COUNTRY,
  REGISTER_OTP_SUCCESS,
  REGISTER_OTP_FAILED,
} from '../authConstants';
import { registerOtp } from '../authActions';

class Register extends Component {
  static propTypes = {
    action: PropTypes.string,
    phoneCode: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    registerOtp: PropTypes.func,
    deviceId: PropTypes.string,
    registerOtpFetch: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        phone_code: '+62',
        phone_number: '87700700060',
        full_name: 'Frandisa Guslians',
        email: 'frandisag@gmail.com',
        password: '1234',
      },
      error: {
        full_name: '',
        email: '',
        password: '',
        phone_number: '',
      },
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setPhoneCode = this.setPhoneCode.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { action, phoneCode, navigation } = this.props;
    const { phone_code, phone_number } = this.state;
    if (prevProps.action !== action) {
      switch (action) {
        case SET_COUNTRY:
          this.setPhoneCode(phoneCode);
          break;
        case REGISTER_OTP_SUCCESS:
          navigation.navigate('Otp', {
            phoneNumber: `${phone_code}${phone_number}`,
            function: 'registerOtpValidate',
          });
          break;
        case REGISTER_OTP_FAILED:
          Toast.show(i18n.t('server_busy'), Toast.LONG);
          break;
        default:
      }
    }
  }

  onSubmit() {
    const { navigation, registerOtp, deviceId } = this.props;
    const { formData, error } = this.state;
    if (formData.full_name === '') {
      this.setState({
        error: {
          ...error,
          full_name: i18n.t('Cannot_be_Empty'),
        },
      });
      return false;
    }
    if (formData.email === '') {
      this.setState({
        error: { ...error, email: i18n.t('Cannot_be_Empty') },
      });
      return false;
    }
    if (formData.password === '') {
      this.setState({
        error: { ...error, password: i18n.t('Cannot_be_Empty') },
      });
      return false;
    }
    if (formData.phone_number === '') {
      this.setState({
        error: { ...error, phone_code: i18n.t('Cannot_be_Empty') },
      });
      return false;
    }

    let sendData = {};

    if (
      formData.phone_number !== '' &&
      formData.phone_number.charAt(0) === '0'
    ) {
      sendData = {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        phone_code: formData.phone_code,
        phone_number: formData.phone_number.substring(1),
      };
    }

    sendData = {
      device_token: deviceId,
      full_name: formData.full_name,
      email: formData.email,
      password: formData.password,
      phone_code: formData.phone_code,
      phone_number: formData.phone_number,
    };
    registerOtp(sendData);
    return true;
  }

  onChangeText(label, value) {
    const { error, formData } = this.state;
    if (value !== '') {
      if (label === 'email') {
        if (value.charAt(0) === '0') {
          this.setState({
            formData: { ...formData, [`${label}`]: value.substring(1) },
            error: { ...error, [`${label}`]: '' },
          });
        } else {
          this.setState({
            formData: { ...formData, [`${label}`]: value },
            error: { ...error, [`${label}`]: '' },
          });
        }
      } else {
        this.setState({
          formData: { ...formData, [`${label}`]: value },
          error: { ...error, [`${label}`]: '' },
        });
      }
    } else {
      this.setState({
        formData: { ...formData, [`${label}`]: '' },
        error: { ...error, [`${label}`]: i18n.t('Cannot_be_Empty') },
      });
    }
  }

  setPhoneCode(data) {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, phone_code: data } });
  }

  renderTitleBody() {
    return (
      <PadderContainer>
        <TextM style={Styles.main.title}>
          Please fill on a few details below
        </TextM>
      </PadderContainer>
    );
  }

  renderForm() {
    const { navigation } = this.props;
    const { formData, error } = this.state;
    return (
      <PadderContainer style={Styles.formContainer}>
        <InputString
          label="Full Name"
          value={formData.full_name}
          onChangeText={value => this.onChangeText('full_name', value)}
          style={Styles.input.fullName}
          error={error.full_name}
        />
        <InputString
          label="Email"
          value={formData.email}
          onChangeText={value => this.onChangeText('email', value)}
          keyboardType="email-address"
          style={Styles.input.email}
          error={error.email}
        />
        <InputString
          secureTextEntry
          label="Password"
          value={formData.password}
          onChangeText={value => this.onChangeText('password', value)}
          style={Styles.input.password}
          error={error.password}
        />
        <InputPhone
          onSelectCountry={() =>
            navigation.navigate('SelectCountry', {
              phoneCode: formData.phone_code,
            })
          }
          phoneCode={formData.phone_code}
          value={formData.phone_number}
          onChangeText={value => this.onChangeText('phone_number', value)}
          label="Phone Number"
          keyboardType="phone-pad"
          style={Styles.input.password}
          error={error.phone_number}
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
        style={Styles.main.button}
        color={Colors.main.baseBlue}
        borderColor={Colors.main.baseWhite}
      >
        {i18n.t('continue')}
      </ButtonFull>
    );
  }

  render() {
    const { navigation, registerOtpFetch } = this.props;
    return (
      <BaseContainer
        title="Please fill on a few details below"
        onBackPress={() => navigation.pop()}
        backgroundColor={Colors.main.baseWhite}
        topColor={Colors.main.baseWhite}
        bottomContent={this.renderButton()}
        persistScrollTitle
      >
        {this.renderTitleBody()}
        {this.renderForm()}
        <LoadingModal loading={registerOtpFetch} />
      </BaseContainer>
    );
  }
}

const mapStateToProps = state => ({
  action: state.auth.action,
  phoneCode: state.auth.phoneCode,
  deviceId: state.session.deviceId,
  registerOtpFetch: state.auth.registerOtpFetch,
});

const mapDispatchToProps = {
  registerOtp: payload => registerOtp(payload),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
