import { GET_ALL_CATEGORIES_FAILURE, GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS } from '../actions/constants';
import { CategoryActionTypes } from '../actions/types';
import { Category } from '../models/category';

type InitialState = {
  categories: Record<string, Category>[];
  isGetAllCategoriesLoading: boolean;
  isGetAllCategoriesDone: boolean;
  isGetAllCategoriesError: boolean;
};

export const initialState: InitialState = {
  categories: [],
  isGetAllCategoriesLoading: false,
  isGetAllCategoriesDone: false,
  isGetAllCategoriesError: false,
};

function categoryReducer(state = initialState, action: CategoryActionTypes) {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
      return { ...state, isGetAllCategoriesLoading: true };
    case GET_ALL_CATEGORIES_SUCCESS:
      return { ...state, isGetAllCategoriesLoading: false, isGetAllCategoriesDone: true, categories: action.payload };
    case GET_ALL_CATEGORIES_FAILURE:
      return { ...state, isGetAllCategoriesLoading: false, isGetAllCategoriesDone: false, isGetAllCategoriesError: action.error };
    default:
      return state;
  }
}

export default categoryReducer;
