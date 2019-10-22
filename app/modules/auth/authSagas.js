import { takeLatest, put, call } from 'redux-saga/effects';
import {
  LOGIN,
  LOGOUT,
  GET_LIST_COUNTRY,
  GET_LIST_REFRESH_COUNTRY,
  GET_LIST_PAGING_COUNTRY,
  REGISTER_OTP,
} from './authConstants';
import {
  loginFailed,
  loginSuccess,
  setAuth,
  clearAuth,
  getListCountrySuccess,
  getListCountryFailed,
  getListRefreshCountrySuccess,
  getListRefreshCountryFailed,
  getListPagingCountrySuccess,
  getListPagingCountryFailed,
  registerOtpSuccess,
  registerOtpFailed,
} from './authActions';
import { loginApi, getListCountryApi, registerOtpApi } from './authApis';
import { RESPONSE_STATUS } from '../../utils/constants';

function* sagaGetListPagingCountry(params) {
  try {
    const response = yield call(getListCountryApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(getListPagingCountrySuccess(response.data));
        break;
      default:
        yield put(getListPagingCountryFailed(response.data));
    }
  } catch (error) {
    yield put(getListPagingCountryFailed(error));
  }
}

function* sagaGetListRefreshCountry(params) {
  try {
    const response = yield call(getListCountryApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(getListRefreshCountrySuccess(response.data));
        break;
      default:
        yield put(getListRefreshCountryFailed(response.data));
    }
  } catch (error) {
    yield put(getListRefreshCountryFailed(error));
  }
}

function* sagaGetListCountry(params) {
  try {
    const response = yield call(getListCountryApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(getListCountrySuccess(response.data));
        break;
      default:
        yield put(getListCountryFailed(response.data));
    }
  } catch (error) {
    yield put(getListCountryFailed(error));
  }
}

function* sagaLogin(params) {
  try {
    const response = yield call(loginApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(setAuth(response.data));
        yield put(loginSuccess());
        break;
      default:
        yield put(loginFailed());
    }
  } catch (error) {
    yield put(loginFailed(error));
  }
}

function* sagaRegisterOtp(params) {
  try {
    const response = yield call(registerOtpApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(registerOtpSuccess());
        break;
      default:
        yield put(registerOtpFailed());
    }
  } catch (error) {
    yield put(registerOtpFailed(error));
  }
}

function* sagaLogout() {
  try {
    yield put(clearAuth());
  } catch (error) {
    console.log(error.message);
  }
}

export default [
  takeLatest(REGISTER_OTP, sagaRegisterOtp),
  takeLatest(LOGIN, sagaLogin),
  takeLatest(LOGOUT, sagaLogout),
  takeLatest(GET_LIST_COUNTRY, sagaGetListCountry),
  takeLatest(GET_LIST_REFRESH_COUNTRY, sagaGetListRefreshCountry),
  takeLatest(GET_LIST_PAGING_COUNTRY, sagaGetListPagingCountry),
];
