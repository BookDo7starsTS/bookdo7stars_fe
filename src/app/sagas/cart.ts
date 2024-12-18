import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  GET_ITEMS_IN_CART_REQUEST,
  GET_ITEMS_IN_CART_SUCCESS,
  GET_ITEMS_IN_CART_FAILURE,
} from '../actions/constants';
import { AddToCartRequestAction, GetItemsInCartRequestAction } from '../actions/types';
import { CartItem } from '../models/cart';

function getItemsInCartAPI() {
  return axios.get('/cart', { withCredentials: true });
}

export function* getItemsInCart(): SagaIterator {
  try {
    const response: any = yield call(getItemsInCartAPI);
    console.log('response===>', response);
    yield put({
      type: GET_ITEMS_IN_CART_SUCCESS,
      payload: response.data.cartItems,
    });
  } catch (err: any) {
    yield put({
      type: GET_ITEMS_IN_CART_FAILURE,
      error: err.response.data.message,
    });
  }
}

function addToCartAPI(data: AddToCartRequestAction['data']) {
  return axios.post('/cart', data, {
    withCredentials: true,
  });
}

export function* addToCart(action: AddToCartRequestAction): SagaIterator {
  try {
    console.log('addToCart사가 잘 들어옴 ');
    if (!action.data.user) {
      yield put({
        type: ADD_TO_CART_SUCCESS,
        payload: action.data,
      });
    }
    const response: any = yield call(addToCartAPI, action.data);
    console.log('response===>', response);
    yield put({
      type: ADD_TO_CART_SUCCESS,
      payload: response.data.cartItem,
    });
  } catch (err: any) {
    yield put({
      type: ADD_TO_CART_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchGetItemsInCart() {
  yield takeLatest(GET_ITEMS_IN_CART_REQUEST, getItemsInCart);
}

function* watchAddCart() {
  yield takeLatest(ADD_TO_CART_REQUEST, addToCart);
}

export default function* bookSaga() {
  yield all([fork(watchAddCart), fork(watchGetItemsInCart)]);
}
