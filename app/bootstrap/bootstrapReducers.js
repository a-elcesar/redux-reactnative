import { combineReducers } from 'redux';
import { authReducers, sessionReducers } from '../modules/auth/authReducers';

const bootstrapReducers = combineReducers({
  auth: authReducers,
  session: sessionReducers,
});

export default bootstrapReducers;
