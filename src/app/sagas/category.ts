import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import { GetAllCategoriesRequestAction } from './../actions/types/category';
import { GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAILURE } from '../actions/constants';

function getAllCategoriesAPI(level: number) {
  return axios.get(`/category?level=${level}`);
}

export function* getAllCategories(action: GetAllCategoriesRequestAction): SagaIterator {
  try {
    const response: any = yield call(getAllCategoriesAPI, action.level);
    yield put({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: GET_ALL_CATEGORIES_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchGetAllCategories() {
  yield takeLatest(GET_ALL_CATEGORIES_REQUEST, getAllCategories);
}

export default function* categorySaga() {
  yield all([fork(watchGetAllCategories)]);
}
