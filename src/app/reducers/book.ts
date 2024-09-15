import {
  GET_ALL_BOOKS_FAILURE,
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_BOOK_FAILURE,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOKS_BY_GROUP_FAILURE,
  GET_BOOKS_BY_GROUP_REQUEST,
  GET_BOOKS_BY_GROUP_SUCCESS,
} from '../actions/constants';
import { BookActionTypes } from '../actions/types';
import { Book } from '../models/book';

type InitialState = {
  books: Book[];
  groupBooks: Book[];
  isGetAllBooksLoading: boolean;
  isGetAllBooksDone: boolean;
  isGetAllBooksError: string;
  isGetBooksByGroupLoading: boolean;
  isGetBooksByGroupDone: boolean;
  isGetBooksByGroupError: string;
  isGetBookLoading: boolean;
  isGetBookDone: boolean;
  isGetBookError: string;
  book: Book[];
  pageSize: number;
};

export const initialState: InitialState = {
  books: [],
  groupBooks: [],
  isGetAllBooksLoading: false,
  isGetAllBooksDone: false,
  isGetAllBooksError: '',
  isGetBooksByGroupLoading: false,
  isGetBooksByGroupDone: false,
  isGetBooksByGroupError: '',
  isGetBookLoading: false,
  isGetBookDone: false,
  isGetBookError: '',
  book: [],
  pageSize: 20,
};

function bookReducer(state = initialState, action: BookActionTypes) {
  switch (action.type) {
    case GET_ALL_BOOKS_REQUEST:
      return { ...state, isGetAllBooksLoading: true };
    case GET_ALL_BOOKS_SUCCESS:
      return { ...state, isGetAllBooksLoading: false, isGetAllBooksDone: true, books: action.payload };
    case GET_ALL_BOOKS_FAILURE:
      return { ...state, isGetAllBooksLoading: false, isGetAllBooksDone: false, isGetAllBooksError: action.error };

    case GET_BOOKS_BY_GROUP_REQUEST:
      return { ...state, isGetBooksByGroupLoading: true };
    case GET_BOOKS_BY_GROUP_SUCCESS:
      return { ...state, isGetBooksByGroupLoading: false, isGetBooksByGroupDone: true, groupBooks: state.groupBooks.concat(action.payload) };
    case GET_BOOKS_BY_GROUP_FAILURE:
      return { ...state, isGetBooksByGroupLoading: false, isGetBooksByGroupDone: false, isGetBooksByGroupError: action.error };

    case GET_BOOK_REQUEST:
      return { ...state, isGetBookLoaing: true };
    case GET_BOOK_SUCCESS:
      return { ...state, isGetBookLoading: false, book: action.payload };
    case GET_BOOK_FAILURE:
      return { ...state, isGetBookLoading: false, book: [], isGetBookError: action.error };
    default:
      return state;
  }
}

export default bookReducer;
