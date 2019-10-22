import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});
