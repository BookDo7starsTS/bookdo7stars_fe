import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import { GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, GET_ORDER_HISTORY_FAILURE } from '../actions/constants';
import { GetOrderHistoryRequestAction } from '../actions/types';

function getOrderHistoryRequestAPI(page: number, pageSize: number) {
  return axios.get(`/order/history?page=${page}&pageSize=${pageSize}`, {
    withCredentials: true, // 쿠키를 포함하여 서버에 요청
  });
}

export function* getOrderHistoryRequest(action: GetOrderHistoryRequestAction): SagaIterator {
  try {
    const response: any = yield call(getOrderHistoryRequestAPI, action.page, action.pageSize);
    console.log('response', response);
    yield put({
      type: GET_ORDER_HISTORY_SUCCESS,
      payload: response.data.orderHistory,
      count: response.data.count,
    });
  } catch (err: any) {
    yield put({
      type: GET_ORDER_HISTORY_FAILURE,
      error: err.response.data.message,
    });
  }
}

// Watchers
function* watchGetOrderHistoryRequest() {
  yield takeLatest(GET_ORDER_HISTORY_REQUEST, getOrderHistoryRequest);
}

// Root Saga
export default function* userSaga() {
  yield all([fork(watchGetOrderHistoryRequest)]);
}
