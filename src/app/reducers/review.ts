import { ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAILURE } from '../actions/constants';
import { ReviewActionTypes } from '../actions/types';
import { Review } from '../models/review';

interface ReviewState {
  reviews: Review[];
  addedReview: Review | null;
  isAddReviewLoading: boolean;
  isAddReviewDone: boolean;
  isAddReviewError: string | null;
}
const initialCartState: ReviewState = {
  reviews: [],
  addedReview: null,
  isAddReviewLoading: false,
  isAddReviewDone: false,
  isAddReviewError: null,
};
function reviewReducer(state = initialCartState, action: ReviewActionTypes): ReviewState {
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
      return { ...state, isAddReviewLoading: true };

    case ADD_REVIEW_SUCCESS: {
      return { ...state, isAddReviewLoading: false, isAddReviewDone: true, addedReview: action.payload };
    }

    case ADD_REVIEW_FAILURE: {
      return { ...state, isAddReviewLoading: false, isAddReviewError: action.error };
    }

    default:
      return state;
  }
}

export default reviewReducer;
