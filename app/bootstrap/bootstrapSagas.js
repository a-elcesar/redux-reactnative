import { all } from 'redux-saga/effects';
import auth from '../modules/auth/authSagas';

function* bootstrapSagas() {
  yield all([...auth]);
}

export default bootstrapSagas;
