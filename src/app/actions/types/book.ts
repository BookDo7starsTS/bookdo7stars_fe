import { Book } from '@/app/models/book';

import { GET_ALL_BOOKS_REQUEST, GET_ALL_BOOKS_SUCCESS, GET_ALL_BOOKS_FAILURE, GET_BOOK_REQUEST, GET_BOOK_SUCCESS, GET_BOOK_FAILURE } from '../constants';

// Action type
// We’ve decided to define request data as data:{}, response data as payload, and errors simply as error.

// All Books
export interface GetAllBooksRequestAction {
  type: typeof GET_ALL_BOOKS_REQUEST;
  page: number;
  pageSize: number;
}

export interface GetAllBooksSuccessAction {
  type: typeof GET_ALL_BOOKS_SUCCESS;
  payload: Book[];
  count: number;
}

export interface GetAllBooksFailureAction {
  type: typeof GET_ALL_BOOKS_FAILURE;
  error: string;
}

// Book Detail
export interface GetBookRequestAction {
  type: typeof GET_BOOK_REQUEST;
  data: string;
}

export interface GetBookSuccessAction {
  type: typeof GET_BOOK_SUCCESS;
  payload: string;
}

export interface GetBookFailureAction {
  type: typeof GET_BOOK_FAILURE;
  error: string;
}

//Union type
export type BookActionTypes =
  | GetAllBooksRequestAction
  | GetAllBooksSuccessAction
  | GetAllBooksFailureAction
  | GetBookRequestAction
  | GetBookSuccessAction
  | GetBookFailureAction;

// Action creater

//All Books
export const getAllBooksRequest = (page: number, pageSize: number): GetAllBooksRequestAction => ({
  type: GET_ALL_BOOKS_REQUEST,
  page,
  pageSize,
});

export const getAllBooksSuccess = (payload: GetAllBooksSuccessAction['payload'], count: GetAllBooksSuccessAction['count'] ): GetAllBooksSuccessAction => ({
  type: GET_ALL_BOOKS_SUCCESS,
  payload,
  count,
});

export const getAllBooksFailure = (error: string): GetAllBooksFailureAction => ({
  type: GET_ALL_BOOKS_FAILURE,
  error,
});

//Book Detail
export const getBookRequest = (data: GetBookRequestAction['data']): GetBookRequestAction => ({
  type: GET_BOOK_REQUEST,
  data,
});

export const getBookSuccess = (payload: GetBookSuccessAction['payload']): GetBookSuccessAction => ({
  type: GET_BOOK_SUCCESS,
  payload,
});

export const getBookFailure = (error: string): GetBookFailureAction => ({
  type: GET_BOOK_FAILURE,
  error,
});
