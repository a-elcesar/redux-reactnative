import * as AUTH from './authConstants';

const loginInitialState = {
  loginFetch: false,
  loginParam: null,
  loginResponse: null,
  loginError: null,
};

const registerOtpInitialState = {
  registerOtpFetch: false,
  registerOtpParam: null,
  registerOtpResponse: null,
  registerOtpError: null,
};

const getListCountryInitialState = {
  getListCountryFetch: false,
  getListCountryParam: null,
  getListCountryResponse: {
    data: [],
    last_page: 0,
  },
  getListCountryError: null,
};

const getListRefreshCountryInitialState = {
  getListRefreshCountryFetch: false,
  getListRefreshCountryParam: null,
  getListRefreshCountryResponse: {
    data: [],
    last_page: 0,
  },
  getListRefreshCountryError: null,
};

const getListPagingCountryInitialState = {
  getListPagingCountryFetch: false,
  getListPagingCountryParam: null,
  getListPagingCountryResponse: {
    data: [],
    last_page: 0,
  },
  getListPagingCountryError: null,
};

const authInitialState = {
  ...getListCountryInitialState,
  ...getListRefreshCountryInitialState,
  ...getListPagingCountryInitialState,
  ...loginInitialState,
  ...registerOtpInitialState,
  phoneCode: '',
  action: '',
};

// eslint-disable-next-line complexity
export const authReducers = (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH.SET_COUNTRY:
      return {
        ...state,
        phoneCode: action.payload,
        action: action.type,
      };
    case AUTH.GET_LIST_PAGING_COUNTRY:
      return {
        ...state,
        getListPagingCountryFetch: true,
        getListPagingCountryParam: action.payload,
        action: action.type,
      };
    case AUTH.GET_LIST_PAGING_COUNTRY_SUCCESS:
      return {
        ...state,
        getListCountryResponse: {
          ...state.getListCountryResponse,
          data: [...state.getListCountryResponse.data, ...action.payload.data],
        },
        getListPagingCountryResponse: action.payload,
        getListPagingCountryFetch: false,
        action: action.type,
      };
    case AUTH.GET_LIST_PAGING_COUNTRY_FAILED:
      return {
        ...state,
        getListPagingCountryError: action.payload,
        getListPagingCountryFetch: false,
        action: action.type,
      };
    case AUTH.GET_LIST_REFRESH_COUNTRY:
      return {
        ...state,
        getListRefreshCountryFetch: true,
        getListRefreshCountryParam: action.payload,
        action: action.type,
      };
    case AUTH.GET_LIST_REFRESH_COUNTRY_SUCCESS:
      return {
        ...state,
        getListRefreshCountryResponse: action.payload,
        getListCountryResponse: action.payload,
        getListRefreshCountryFetch: false,
        action: action.type,
      };
    case AUTH.GET_LIST_REFRESH_COUNTRY_FAILED:
      return {
        ...state,
        getListRefreshCountryError: action.payload,
        getListRefreshCountryFetch: false,
        action: action.type,
      };
    case AUTH.GET_LIST_COUNTRY:
      return {
        ...state,
        getListCountryFetch: true,
        getListCountryParam: action.payload,
        action: action.type,
      };
    case AUTH.GET_LIST_COUNTRY_SUCCESS:
      return {
        ...state,
        getListCountryResponse: action.payload,
        getListCountryFetch: false,
        action: action.type,
      };
    case AUTH.GET_LIST_COUNTRY_FAILED:
      return {
        ...state,
        getListCountryError: action.payload,
        getListCountryFetch: false,
        action: action.type,
      };
    case AUTH.LOGIN:
      return {
        ...state,
        loginFetch: true,
        loginParam: action.payload,
        action: action.type,
      };
    case AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        loginResponse: action.payload,
        loginFetch: false,
        action: action.type,
      };
    case AUTH.LOGIN_FAILED:
      return {
        ...state,
        loginError: action.payload,
        loginFetch: false,
        action: action.type,
      };
    case AUTH.REGISTER_OTP:
      return {
        ...state,
        registerOtpFetch: true,
        registerOtpParam: action.payload,
        action: action.type,
      };
    case AUTH.REGISTER_OTP_SUCCESS:
      return {
        ...state,
        registerOtpResponse: action.payload,
        registerOtpFetch: false,
        action: action.type,
      };
    case AUTH.REGISTER_OTP_FAILED:
      return {
        ...state,
        registerOtpError: action.payload,
        registerOtpFetch: false,
        action: action.type,
      };
    default:
      return state;
  }
};

const sessionInitialState = {
  userData: {
    id: '',
    name: '',
    token: '',
    refreshToken: '',
  },
  isSeeLanding: 0,
  lang: 'en-EN',
  deviceId: null,
  action: '',
};

export const sessionReducers = (state = sessionInitialState, action) => {
  switch (action.type) {
    case AUTH.SET_AUTH:
      return {
        ...state,
        userData: action.payload.userData,
        action: action.type,
      };
    case AUTH.CLEAR_AUTH:
      return {
        ...state,
        userData: {
          id: '',
          name: '',
          email: '',
          token: '',
          refreshToken: '',
        },
        action: action.type,
      };
    case AUTH.SET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload,
        action: action.type,
      };
    case AUTH.SET_SEE_LANDING:
      return {
        ...state,
        isSeeLanding: 1,
        action: action.type,
      };
    default:
      return state;
  }
};
