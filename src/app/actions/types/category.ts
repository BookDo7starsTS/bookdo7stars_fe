import { Category, CategoryById } from '@/app/models/category';

import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_FAILURE,
  GET_CATEGORY_BY_ID_SUCCESS,
  RESET_CATEGORY_BY_ID_REQUEST,
  SET_SELECTED_CATEGORY_ID,
  SET_EXPANDED_CATEGORY_IDS,
} from '../constants';

// Action type
// We’ve decided to define request data as data:{}, response data as payload, and errors simply as error.

export interface GetCategoryRequestAction {
  type: typeof GET_CATEGORY_REQUEST;
  level: number;
}

export interface GetCategorySuccessAction {
  type: typeof GET_CATEGORY_SUCCESS;
  payload: Category[];
}

export interface GetCategoryFailureAction {
  type: typeof GET_CATEGORY_FAILURE;
  error: string;
}

export interface GetCategoryByIdRequestAction {
  type: typeof GET_CATEGORY_BY_ID_REQUEST;
  id: string;
}

export interface GetCategoryByIdSuccessAction {
  type: typeof GET_CATEGORY_BY_ID_SUCCESS;
  payload: Record<string, CategoryById[]>;
}

export interface GetCategoryByIdFailureAction {
  type: typeof GET_CATEGORY_BY_ID_FAILURE;
  error: string;
}

export interface ResetCategoryByIdAction {
  type: typeof RESET_CATEGORY_BY_ID_REQUEST;
  id: string;
}

export interface SetCategoryIdRequestAction {
  type: typeof SET_SELECTED_CATEGORY_ID;
  id: string | undefined;
}

export interface SetExpandedCategoryIdsRequestAction {
  type: typeof SET_EXPANDED_CATEGORY_IDS;
  ids: string[];
}

//Union type
export type CategoryActionTypes =
  | GetCategoryRequestAction
  | GetCategorySuccessAction
  | GetCategoryFailureAction
  | GetCategoryByIdRequestAction
  | GetCategoryByIdSuccessAction
  | GetCategoryByIdFailureAction
  | ResetCategoryByIdAction
  | SetCategoryIdRequestAction
  | SetExpandedCategoryIdsRequestAction;

export const getCategoryRequest = (level: number): GetCategoryRequestAction => ({
  type: GET_CATEGORY_REQUEST,
  level,
});

export const getCategorySuccess = (payload: GetCategorySuccessAction['payload']): GetCategorySuccessAction => ({
  type: GET_CATEGORY_SUCCESS,
  payload,
});

export const getCategoryFailure = (error: string): GetCategoryFailureAction => ({
  type: GET_CATEGORY_FAILURE,
  error,
});

export const getCategoryByIdRequest = (id: string): GetCategoryByIdRequestAction => ({
  type: GET_CATEGORY_BY_ID_REQUEST,
  id,
});

export const getCategoryByIdSuccess = (payload: GetCategoryByIdSuccessAction['payload']): GetCategoryByIdSuccessAction => ({
  type: GET_CATEGORY_BY_ID_SUCCESS,
  payload,
});

export const getCategoryByIdFailure = (error: string): GetCategoryByIdFailureAction => ({
  type: GET_CATEGORY_BY_ID_FAILURE,
  error,
});

export const resetCategoryByIdRequest = (id: string): ResetCategoryByIdAction => ({
  type: RESET_CATEGORY_BY_ID_REQUEST,
  id,
});

export const setCategoryIdRequestAction = (id: string | undefined): SetCategoryIdRequestAction => ({
  type: SET_SELECTED_CATEGORY_ID,
  id,
});

export const setExpandedCategoryIdsRequestAction = (ids: string[]): SetExpandedCategoryIdsRequestAction => ({
  type: SET_EXPANDED_CATEGORY_IDS,
  ids,
});
