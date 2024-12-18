import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
    ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE
} from '../actions/constants';
import { AddToCartRequestAction  } from '../actions/types';
import { CartItem } from '../models/cart';

function addToCartAPI(data:AddToCartRequestAction['data']) {
  return axios.post('/cart', data);
}

export function* addToCart(action: AddToCartRequestAction): SagaIterator {
  try {
    console.log("addToCart사가 잘 들어옴 ")
    const response: any = yield call(addToCartAPI, action.data);
    console.log("response===>", response)
    yield put({
      type: ADD_TO_CART_SUCCESS,
      payload: response.data.books,
      count: response.data.count,
    });
  } catch (err: any) {
    yield put({
      type: ADD_TO_CART_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchAddCart() {
  yield takeLatest(ADD_TO_CART_REQUEST, addToCart);
}

export default function* bookSaga() {
  yield all([
    fork(watchAddCart),
  ]);
}
