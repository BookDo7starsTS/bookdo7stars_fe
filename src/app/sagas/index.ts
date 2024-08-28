import axios from 'axios';
import { all, fork } from 'redux-saga/effects';

import userSaga from './user';
import bookSaga from './book';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export function* rootSaga() {
  yield all([fork(userSaga), fork(bookSaga)]);
}

export default rootSaga;
