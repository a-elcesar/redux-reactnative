import * as AUTH from './authConstants';

export const login = payload => ({ type: AUTH.LOGIN, payload });
export const loginSuccess = () => ({ type: AUTH.LOGIN_SUCCESS });
export const loginFailed = () => ({ type: AUTH.LOGIN_FAILED });

export const signup = payload => ({ type: AUTH.SIGNUP, payload });
export const signupSuccess = () => ({ type: AUTH.SIGNUP_SUCCESS });
export const signupFailed = () => ({ type: AUTH.SIGNUP_FAILED });

export const setAuth = payload => ({ type: AUTH.SET_AUTH, payload });
export const clearAuth = payload => ({ type: AUTH.CLEAR_AUTH, payload });
export const setDeviceId = payload => ({ type: AUTH.SET_DEVICE_ID, payload });
export const setSeeLanding = () => ({ type: AUTH.SET_SEE_LANDING });
export const setCountry = payload => ({ type: AUTH.SET_COUNTRY, payload });

export const getListCountry = payload => ({
  type: AUTH.GET_LIST_COUNTRY,
  payload,
});
export const getListCountrySuccess = payload => ({
  type: AUTH.GET_LIST_COUNTRY_SUCCESS,
  payload,
});
export const getListCountryFailed = payload => ({
  type: AUTH.GET_LIST_COUNTRY_FAILED,
  payload,
});

export const getListRefreshCountry = payload => ({
  type: AUTH.GET_LIST_REFRESH_COUNTRY,
  payload,
});
export const getListRefreshCountrySuccess = payload => ({
  type: AUTH.GET_LIST_REFRESH_COUNTRY_SUCCESS,
  payload,
});
export const getListRefreshCountryFailed = payload => ({
  type: AUTH.GET_LIST_REFRESH_COUNTRY_FAILED,
  payload,
});

export const getListPagingCountry = payload => ({
  type: AUTH.GET_LIST_PAGING_COUNTRY,
  payload,
});
export const getListPagingCountrySuccess = payload => ({
  type: AUTH.GET_LIST_PAGING_COUNTRY_SUCCESS,
  payload,
});
export const getListPagingCountryFailed = payload => ({
  type: AUTH.GET_LIST_PAGING_COUNTRY_FAILED,
  payload,
});

export const registerOtp = payload => ({
  type: AUTH.REGISTER_OTP,
  payload,
});
export const registerOtpSuccess = payload => ({
  type: AUTH.REGISTER_OTP_SUCCESS,
  payload,
});
export const registerOtpFailed = payload => ({
  type: AUTH.REGISTER_OTP_FAILED,
  payload,
});

export const register = payload => ({
  type: AUTH.REGISTER,
  payload,
});
export const registerSuccess = payload => ({
  type: AUTH.REGISTER_SUCCESS,
  payload,
});
export const registerFailed = payload => ({
  type: AUTH.REGISTER_FAILED,
  payload,
});
