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
  GET_BOOKS_BY_GROUP_REQUEST,
  GET_BOOKS_BY_GROUP_SUCCESS,
  GET_BOOKS_BY_GROUP_FAILURE,
  GET_BOOKS_SEARCH_REQUEST,
  GET_BOOKS_SEARCH_SUCCESS,
  GET_BOOKS_SEARCH_FAILURE,
  GET_BOOK_ISBN_SEARCH_REQUEST,
  GET_BOOK_ISBN_SEARCH_SUCCESS,
  GET_BOOK_ISBN_SEARCH_FAILURE,
} from '../actions/constants';
import {
  GetAllBooksRequestAction,
  GetBookRequestAction,
  GetBooksByGroupRequestAction,
  GetBooksSearchRequestAction,
  GetBookIsbnSearchRequestAction,
} from '../actions/types';

function getAllBooksAPI(page: number, pageSize: number) {
  return axios.get(`/book?page=${page}&pageSize=${pageSize}`);
}

export function* getAllBooks(action: GetAllBooksRequestAction): SagaIterator {
  try {
    const response: any = yield call(getAllBooksAPI, action.page, action.pageSize);
    yield put({
      type: GET_ALL_BOOKS_SUCCESS,
      payload: response.data.books,
      count: response.data.count,
    });
  } catch (err: any) {
    yield put({
      type: GET_ALL_BOOKS_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getBooksByGroupAPI(data: GetBooksByGroupRequestAction['data']) {
  return axios.get(`/book/${data.groupName}?page=${data.page}&pageSize=${data.pageSize}`);
}

export function* getBooksByGroup(action: GetBooksByGroupRequestAction): SagaIterator {
  try {
    const response: any = yield call(getBooksByGroupAPI, action.data);
    yield put({
      type: GET_BOOKS_BY_GROUP_SUCCESS,
      payload: response.data.books,
    });
  } catch (err: any) {
    yield put({
      type: GET_BOOKS_BY_GROUP_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getBooksSearchAPI(data: GetBooksSearchRequestAction['data']) {
  const queryString: string = new URLSearchParams(data as any).toString();
  return axios.get(`/book?${queryString}`);
}

export function* getBooksSearch(action: GetBooksSearchRequestAction): SagaIterator {
  try {
    const response: any = yield call(getBooksSearchAPI, action.data);
    yield put({
      type: GET_BOOKS_SEARCH_SUCCESS,
      payload: response.data.books,
      count: response.data.count,
    });
  } catch (err: any) {
    yield put({
      type: GET_BOOKS_SEARCH_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getBookIsbnSearchAPI(isbn: string) {
  console.log('API 요청 URL: ', `/search/${isbn}`);
  return axios.get(`/book/search/${isbn}`);
}

export function* getBookIsbnSearch(action: GetBookIsbnSearchRequestAction): SagaIterator {
  try {
    console.log('[05] isbn서치사가이다! data잘들어왔을까?', action.isbn);
    if (!action.isbn) {
      console.log('ISBN이 없습니다. API 요청을 건너뜁니다.');
      return;
    }
    const response: any = yield call(getBookIsbnSearchAPI, action.isbn);
    console.log('잘받아오니?', response.data.book);
    yield put({
      type: GET_BOOK_ISBN_SEARCH_SUCCESS,
      payload: response.data.book,
    });
  } catch (error: any) {
    yield put({
      type: GET_BOOK_ISBN_SEARCH_FAILURE,
      error: error.response.data.message || 'Error occurred while fetching the book.',
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

function* watchGetAllBooks() {
  yield takeLatest(GET_ALL_BOOKS_REQUEST, getAllBooks);
}

function* watchGetBooksByGroup() {
  yield takeLatest(GET_BOOKS_BY_GROUP_REQUEST, getBooksByGroup);
}

function* watchGetBooksSearch() {
  yield takeLatest(GET_BOOKS_SEARCH_REQUEST, getBooksSearch);
}

function* watchGetBookIsbnSearch() {
  console.log('[04] 사가에서 ISBN 검색 액션을 감지했습니다.');
  yield takeLatest(GET_BOOK_ISBN_SEARCH_REQUEST, getBookIsbnSearch);
}

function* watchGetBook() {
  yield takeLatest(GET_BOOK_REQUEST, getBook);
}

export default function* bookSaga() {
  yield all([fork(watchGetAllBooks), fork(watchGetBook), fork(watchGetBooksByGroup), fork(watchGetBooksSearch), fork(watchGetBookIsbnSearch)]);
}
