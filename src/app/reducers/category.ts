import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_BY_ID_FAILURE,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
  RESET_CATEGORY_BY_ID_REQUEST,
  SET_SELECTED_PARENT_CATEGORY_ID,
  SET_EXPANDED_CATEGORY_IDS,
  SET_SUB_CATEGORY_IDS,
} from '../actions/constants';
import { CategoryActionTypes } from '../actions/types';
import { Category, CategoryById } from '../models/category';

type InitialState = {
  categories: Category[];
  categoriesById: Record<string, CategoryById[]>;
  selectedParentCategoryId: string;
  expandedIds: string[];
  allSubCategoryIds: string[];
  isGetCategoryLoading: boolean;
  isGetCategoryDone: boolean;
  isGetCategoryError: string;
  isGetCategoryByIdLoading: boolean;
  isGetCategoryByIdDone: boolean;
  isGetCategoryByIdError: string;
  isResetCategoryByIdLoading: boolean;
  isResetCategoryByIdDone: boolean;
  isResetCategoryByIdError: string;
};

export const initialState: InitialState = {
  categories: [],
  categoriesById: {},
  selectedParentCategoryId: '',
  expandedIds: [],
  allSubCategoryIds: [],
  isGetCategoryLoading: false,
  isGetCategoryDone: false,
  isGetCategoryError: '',
  isGetCategoryByIdLoading: false,
  isGetCategoryByIdDone: false,
  isGetCategoryByIdError: '',
  isResetCategoryByIdLoading: false,
  isResetCategoryByIdDone: false,
  isResetCategoryByIdError: '',
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
    case RESET_CATEGORY_BY_ID_REQUEST:
      const { [action.id]: _, ...restCategoriesById } = state.categoriesById;
      return { ...state, isResetCategoryByIdLoading: true, categoriesById: restCategoriesById };
    case SET_SELECTED_PARENT_CATEGORY_ID:
      return { ...state, selectedParentCategoryId: action.id };
    case SET_EXPANDED_CATEGORY_IDS:
      return { ...state, expandedIds: action.ids };
    case SET_SUB_CATEGORY_IDS:
      console.log(action.subCatIds);
      return { ...state, allSubCategoryIds: action.subCatIds };
    default:
      return state;
  }
}

export default categoryReducer;
