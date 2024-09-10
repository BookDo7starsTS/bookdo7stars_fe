import { Book } from '@/app/models/book';

import {
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILURE,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAILURE,
  GET_BESTSELLER_BOOKS_REQUEST,
  GET_BESTSELLER_BOOKS_SUCCESS,
  GET_BESTSELLER_BOOKS_FAILURE,
  RESET_BOOKS,
} from '../constants';

// Action type
// We’ve decided to define request data as data:{}, response data as payload, and errors simply as error.

// All Books
export interface GetAllBooksRequestAction {
  type: typeof GET_ALL_BOOKS_REQUEST;
}

export interface GetAllBooksSuccessAction {
  type: typeof GET_ALL_BOOKS_SUCCESS;
  payload: Book[];
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

export interface GetBestsellerRequestAction {
  type: typeof GET_BESTSELLER_BOOKS_REQUEST;
  groupName: string;
  page: number;
  pageSize: number;
}

export interface GetBestsellerSuccessAction {
  type: typeof GET_BESTSELLER_BOOKS_SUCCESS;
  payload: Book[];
}
export interface GetBestsellerFailureAction {
  type: typeof GET_BESTSELLER_BOOKS_FAILURE;
  error: string;
}

export interface ResetBooksAction {
  type: typeof RESET_BOOKS;
}

//Union type
export type BookActionTypes =
  | GetAllBooksRequestAction
  | GetAllBooksSuccessAction
  | GetAllBooksFailureAction
  | GetBookRequestAction
  | GetBookSuccessAction
  | GetBookFailureAction
  | GetBestsellerRequestAction
  | GetBestsellerSuccessAction
  | GetBestsellerFailureAction
  | ResetBooksAction;

// Action creater

//All Books
export const getAllBooksRequest = (): GetAllBooksRequestAction => ({
  type: GET_ALL_BOOKS_REQUEST,
});

export const getAllBooksSuccess = (payload: GetAllBooksSuccessAction['payload']): GetAllBooksSuccessAction => ({
  type: GET_ALL_BOOKS_SUCCESS,
  payload,
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

export const getBestsellerRequest = (
  groupName: GetBestsellerRequestAction['groupName'],
  page: GetBestsellerRequestAction['page'],
  pageSize: GetBestsellerRequestAction['pageSize'],
): GetBestsellerRequestAction => ({
  type: GET_BESTSELLER_BOOKS_REQUEST,
  groupName,
  page,
  pageSize,
});

export const getBestsellerSuccess = (payload: GetBestsellerSuccessAction['payload']): GetBestsellerSuccessAction => ({
  type: GET_BESTSELLER_BOOKS_SUCCESS,
  payload,
});

export const getBestsellerFailure = (error: GetBestsellerFailureAction['error']): GetBestsellerFailureAction => ({
  type: GET_BESTSELLER_BOOKS_FAILURE,
  error,
});

export const resetBooks = (): ResetBooksAction => ({
  type: RESET_BOOKS,
});
