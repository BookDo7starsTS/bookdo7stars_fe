import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_BY_ID_FAILURE,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
} from '../actions/constants';
import { CategoryActionTypes } from '../actions/types';
import { Category, CategoryById } from '../models/category';

type InitialState = {
  categories: Category[];
  categoriesById: Record<string, CategoryById[]>;
  isGetCategoryLoading: boolean;
  isGetCategoryDone: boolean;
  isGetCategoryError: string;
  isGetCategoryByIdLoading: boolean;
  isGetCategoryByIdDone: boolean;
  isGetCategoryByIdError: string;
};

export const initialState: InitialState = {
  categories: [],
  categoriesById: {},
  isGetCategoryLoading: false,
  isGetCategoryDone: false,
  isGetCategoryError: '',
  isGetCategoryByIdLoading: false,
  isGetCategoryByIdDone: false,
  isGetCategoryByIdError: '',
};

function categoryReducer(state = initialState, action: CategoryActionTypes) {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { ...state, isGetCategoryLoading: true };
    case GET_CATEGORY_SUCCESS:
      return { ...state, isGetCategoryLoading: false, isGetCategoryDone: true, categories: action.payload };
    case GET_CATEGORY_FAILURE:
      return { ...state, isGetCategoryLoading: false, isGetCategoryDone: false, isGetCategoryError: action.error };
    case GET_CATEGORY_BY_ID_REQUEST:
      return { ...state, isGetCategoryByIdLoading: true };
    case GET_CATEGORY_BY_ID_SUCCESS:
      return { ...state, isGetCategoryByIdLoading: false, isGetCategoryByIdDone: true, categoriesById: { ...state.categoriesById, ...action.payload } };
    case GET_CATEGORY_BY_ID_FAILURE:
      return { ...state, isGetCategoryByIdLoading: false, isGetCategoryByIdDone: false, isGetCategoryByIdError: action.error };
    default:
      return state;
  }
}

export default categoryReducer;
