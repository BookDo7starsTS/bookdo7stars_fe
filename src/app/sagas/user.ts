import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RegisterRequestAction,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LoginRequestAction,
} from '../actions';

// Register API
function registerAPI(data: RegisterRequestAction['data']) {
  console.log('DATA', data);
  return axios.post('/users', data);
}

// Register saga
function* register(action: RegisterRequestAction) {
  try {
    yield call(registerAPI, action.data);
    yield put({
      type: REGISTER_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: REGISTER_FAILURE,
      error: err.response.data,
    });
  }
}

// Login API
function loginAPI(data: LoginRequestAction['data']) {
  return axios.post('/login', data); // 로그인 API 엔드포인트 (라우터, 바디에 담을 내용)
}

// Login saga
function* login(action: LoginRequestAction): SagaIterator {
  try {
    const response: any = yield call(loginAPI, action.data); //(실행할 함수, 그 함수에서 사용할 인자)
    yield put({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// Watchers
function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login); //(디스페치감지, 감지했을 때 실행되는함수)
}

// Root Saga
export default function* userSaga() {
  yield all([fork(watchRegister), fork(watchLogin)]);
}
