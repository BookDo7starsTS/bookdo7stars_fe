import { Review, ReviewDto } from '@/app/models/review';

import { ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILURE } from '../constants';

export interface AddReviewRequestAction {
  type: typeof ADD_REVIEW_REQUEST;
  data: ReviewDto;
}

export interface AddReviewSuccessAction {
  type: typeof ADD_REVIEW_SUCCESS;
  payload: Review;
}

export interface AddReviewFailureAction {
  type: typeof ADD_REVIEW_FAILURE;
  error: string;
}

export type ReviewActionTypes = AddReviewRequestAction | AddReviewSuccessAction | AddReviewFailureAction;

export const addReviewRequest = (data: AddReviewRequestAction['data']): AddReviewRequestAction => ({
  type: ADD_REVIEW_REQUEST,
  data: data,
});

export const addReviewSuccess = (review: Review): AddReviewSuccessAction => ({
  type: ADD_REVIEW_SUCCESS,
  payload: review,
});

export const addReviewFailure = (error: string): AddReviewFailureAction => ({
  type: ADD_REVIEW_FAILURE,
  error,
});
