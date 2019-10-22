import { api } from '../../bootstrap/bootstrapApi';

export const registerOtpApi = payload => api.post('/api/register-otp', payload);

export const loginApi = payload => api.post('/api/login', payload);

export const getListCountryApi = payload => {
  return api.get('/api/setting/get-list-country?page=' + payload.page);
};
