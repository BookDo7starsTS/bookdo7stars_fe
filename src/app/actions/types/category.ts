import { Category } from '@/app/models/category';

import { GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAILURE } from '../constants';

// Action type
// We’ve decided to define request data as data:{}, response data as payload, and errors simply as error.

// All Books
export interface GetAllCategoriesRequestAction {
  type: typeof GET_ALL_CATEGORIES_REQUEST;
  level: number;
}

export interface GetAllCategoriesSuccessAction {
  type: typeof GET_ALL_CATEGORIES_SUCCESS;
  payload: Category[];
}

export interface GetAllCategoriesFailureAction {
  type: typeof GET_ALL_CATEGORIES_FAILURE;
  error: string;
}

//Union type
export type CategoryActionTypes = GetAllCategoriesRequestAction | GetAllCategoriesSuccessAction | GetAllCategoriesFailureAction;

// Action creater

//All Books
export const getAllCategoriesRequest = (level: number): GetAllCategoriesRequestAction => ({
  type: GET_ALL_CATEGORIES_REQUEST,
  level,
});

export const getAllCategoriesSuccess = (payload: GetAllCategoriesSuccessAction['payload']): GetAllCategoriesSuccessAction => ({
  type: GET_ALL_CATEGORIES_SUCCESS,
  payload,
});

export const getAllCategoriesFailure = (error: string): GetAllCategoriesFailureAction => ({
  type: GET_ALL_CATEGORIES_FAILURE,
  error,
});
