import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import { MAKE_AN_ORDER_REQUEST, MAKE_AN_ORDER_SUCCESS, MAKE_AN_ORDER_FAILURE } from '../actions/constants';
import { MakeAnOrderRequestAction } from '../actions/types';

function makeAnOrderAPI(data: MakeAnOrderRequestAction['data']) {
  return axios.post('/order', data, {
    withCredentials: true,
  });
}

export function* makeAnOrder(action: MakeAnOrderRequestAction): SagaIterator {
  try {
    const response: any = yield call(makeAnOrderAPI, action.data);
    yield put({
      type: MAKE_AN_ORDER_SUCCESS,
      payload: response.data.orderNumber,
    });
  } catch (err: any) {
    yield put({
      type: MAKE_AN_ORDER_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchMakeAnOrder() {
  yield takeLatest(MAKE_AN_ORDER_REQUEST, makeAnOrder);
}

export default function* cartSaga() {
  yield all([fork(watchMakeAnOrder)]);
}
