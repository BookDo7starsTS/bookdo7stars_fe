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
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_FAILURE,
  ADD_REVIEW_SUCCESS,
  GET_ALL_REVIEWS_OF_BOOK_REQUEST,
  GET_ALL_REVIEWS_OF_BOOK_SUCCESS,
  GET_ALL_REVIEWS_OF_BOOK_FAILURE,
} from '../actions/constants';
import { AddReviewRequestAction, AddToCartRequestAction, RemoveFromCartRequestAction } from '../actions/types';

function getAllReviewsOfBookAPI(data: AddReviewRequestAction['data']) {
  return axios.get(`/review/${data.bookId}`);
}

export function* getAllReviewsOfBook(action: AddReviewRequestAction): SagaIterator {
  try {
    console.log(action.data);
    const response: any = yield call(getAllReviewsOfBookAPI, action.data);
    yield put({
      type: GET_ALL_REVIEWS_OF_BOOK_SUCCESS,
      payload: response.data.reviews,
    });
  } catch (err: any) {
    yield put({
      type: GET_ALL_REVIEWS_OF_BOOK_FAILURE,
      error: err.response.data.message,
    });
  }
}

function addReviewAPI(data: AddReviewRequestAction['data']) {
  return axios.post(`/review/${data.bookId}`, data, {
    withCredentials: true,
  });
}

export function* addReview(action: AddReviewRequestAction): SagaIterator {
  try {
    console.log(action.data);
    const response: any = yield call(addReviewAPI, action.data);
    yield put({
      type: ADD_REVIEW_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: ADD_REVIEW_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchGetAllReviewsOfBook() {
  yield takeLatest(GET_ALL_REVIEWS_OF_BOOK_REQUEST, getAllReviewsOfBook);
}

function* watchAddReview() {
  yield takeLatest(ADD_REVIEW_REQUEST, addReview);
}

export default function* bookSaga() {
  yield all([fork(watchAddReview), fork(watchGetAllReviewsOfBook)]);
}
