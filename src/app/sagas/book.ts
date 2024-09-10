import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  GET_ALL_BOOKS_FAILURE,
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAILURE,
  GET_BESTSELLER_BOOKS_REQUEST,
  GET_BESTSELLER_BOOKS_SUCCESS,
  GET_BESTSELLER_BOOKS_FAILURE,
} from '../actions/constants';
import { GetBookRequestAction, GetBestsellerRequestAction } from '../actions/types';

function getAllBooksAPI() {
  return axios.get('/book');
}

export function* getAllBooks(): SagaIterator {
  try {
    const response: any = yield call(getAllBooksAPI);
    yield put({
      type: GET_ALL_BOOKS_SUCCESS,
      payload: response.data.books,
    });
  } catch (err: any) {
    yield put({
      type: GET_ALL_BOOKS_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getBookAPI(id: GetBookRequestAction['data']) {
  return axios.get(`/book/detail/${id}`);
}

export function* getBook(action: GetBookRequestAction): SagaIterator {
  try {
    const response: any = yield call(getBookAPI, action.data);
    yield put({
      type: GET_BOOK_SUCCESS,
      payload: response.data.book,
    });
  } catch (err: any) {
    yield put({
      type: GET_BOOK_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getBestsellerAPI(groupName: string, page: number, pageSize: number) {
  return axios.get(`/book/${groupName}?page=${page}&pageSize=${pageSize}`);
}

export function* getBestseller(action: GetBestsellerRequestAction): SagaIterator {
  try {
    const response: any = yield call(getBestsellerAPI, action.groupName, action.page, action.pageSize);
    yield put({
      type: GET_BESTSELLER_BOOKS_SUCCESS,
      payload: response.data.books,
    });
  } catch (err: any) {
    yield put({
      type: GET_BESTSELLER_BOOKS_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchGetAllBooks() {
  yield takeLatest(GET_ALL_BOOKS_REQUEST, getAllBooks);
}

function* watchGetBook() {
  yield takeLatest(GET_BOOK_REQUEST, getBook);
}

function* watchGetBestseller() {
  yield takeLatest(GET_BESTSELLER_BOOKS_REQUEST, getBestseller);
}

export default function* bookSaga() {
  yield all([fork(watchGetAllBooks), fork(watchGetBook), fork(watchGetBestseller)]);
}
