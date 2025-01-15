import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  GET_ALL_REVIEWS_OF_BOOK_FAILURE,
  GET_ALL_REVIEWS_OF_BOOK_REQUEST,
  GET_ALL_REVIEWS_OF_BOOK_SUCCESS,
  EDIT_REVIEW_FAILURE,
  EDIT_REVIEW_REQUEST,
  EDIT_REVIEW_SUCCESS,
} from '../actions/constants';
import { ReviewActionTypes } from '../actions/types';
import { Review } from '../models/review';

interface ReviewState {
  reviews: Review[];
  addedReview: Review | null;
  isGetAllReviewsOfBookLoading: boolean;
  isGetAllReviewsOfBookDone: boolean;
  isGetAllReviewsOfBookError: string | null;
  isAddReviewLoading: boolean;
  isAddReviewDone: boolean;
  isAddReviewError: string | null;
  isEditReviewLoading: boolean;
  isEditReviewDone: boolean;
  isEditReviewError: string | null;
}
const initialCartState: ReviewState = {
  reviews: [],
  addedReview: null,
  isGetAllReviewsOfBookLoading: false,
  isGetAllReviewsOfBookDone: false,
  isGetAllReviewsOfBookError: null,
  isAddReviewLoading: false,
  isAddReviewDone: false,
  isAddReviewError: null,
  isEditReviewLoading: false,
  isEditReviewDone: false,
  isEditReviewError: null,
};
function reviewReducer(state = initialCartState, action: ReviewActionTypes): ReviewState {
  switch (action.type) {
    case GET_ALL_REVIEWS_OF_BOOK_REQUEST:
      return { ...state, isGetAllReviewsOfBookLoading: true };

    case GET_ALL_REVIEWS_OF_BOOK_SUCCESS: {
      return { ...state, isGetAllReviewsOfBookLoading: false, isGetAllReviewsOfBookDone: true, reviews: action.payload };
    }

    case GET_ALL_REVIEWS_OF_BOOK_FAILURE: {
      return { ...state, isGetAllReviewsOfBookLoading: false, isGetAllReviewsOfBookError: action.error };
    }
    case ADD_REVIEW_REQUEST:
      return { ...state, isAddReviewLoading: true };

    case ADD_REVIEW_SUCCESS: {
      return { ...state, isAddReviewLoading: false, isAddReviewDone: true, addedReview: action.payload };
    }

    case ADD_REVIEW_FAILURE: {
      return { ...state, isAddReviewLoading: false, isAddReviewError: action.error };
    }

    case EDIT_REVIEW_REQUEST:
      return { ...state, isEditReviewLoading: true };

    case EDIT_REVIEW_SUCCESS: {
      return { ...state, isEditReviewLoading: false, isEditReviewDone: true };
    }

    case EDIT_REVIEW_FAILURE: {
      return { ...state, isEditReviewLoading: false, isEditReviewError: action.error };
    }

    default:
      return state;
  }
}

export default reviewReducer;
