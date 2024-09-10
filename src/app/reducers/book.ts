import {
  GET_ALL_BOOKS_FAILURE,
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_BOOK_FAILURE,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BESTSELLER_BOOKS_FAILURE,
  GET_BESTSELLER_BOOKS_REQUEST,
  GET_BESTSELLER_BOOKS_SUCCESS,
  RESET_BOOKS,
} from '../actions/constants';
import { BookActionTypes } from '../actions/types';
import { Book } from '../models/book';

type InitialState = {
  books: Book[];
  isGetAllBooksLoading: boolean;
  isGetAllBooksDone: boolean;
  isGetAllBooksError: string;
  isGetBookLoading: boolean;
  isGetBookDone: boolean;
  isGetBookError: string;
  book: Book[];
  isGetBestsellerLoading: boolean;
  isGetBestsellerDone: boolean;
  isGetBestsellerError: string;
};

export const initialState: InitialState = {
  books: [],
  isGetAllBooksLoading: false,
  isGetAllBooksDone: false,
  isGetAllBooksError: '',
  isGetBookLoading: false,
  isGetBookDone: false,
  isGetBookError: '',
  book: [],
  isGetBestsellerLoading: false,
  isGetBestsellerDone: false,
  isGetBestsellerError: '',
};

function bookReducer(state = initialState, action: BookActionTypes) {
  switch (action.type) {
    case GET_ALL_BOOKS_REQUEST:
      return { ...state, isGetAllBooksLoading: true };
    case GET_ALL_BOOKS_SUCCESS:
      return { ...state, isGetAllBooksLoading: false, isGetAllBooksDone: true, books: action.payload };
    case GET_ALL_BOOKS_FAILURE:
      return { ...state, isGetAllBooksLoading: false, isGetAllBooksDone: false, isGetAllBooksError: action.error };

    case GET_BOOK_REQUEST:
      return { ...state, isGetBookLoaing: true };
    case GET_BOOK_SUCCESS:
      return { ...state, isGetBookLoading: false, book: action.payload };
    case GET_BOOK_FAILURE:
      return { ...state, isGetBookLoading: false, book: [], isGetBookError: action.error };

    case GET_BESTSELLER_BOOKS_REQUEST:
      return { ...state, isGetBestsellerLoading: true };
    case GET_BESTSELLER_BOOKS_SUCCESS:
      return { ...state, isGetBestsellerLoading: false, isGetBestsellerDone: true, books: [...state.books, ...action.payload] };
    case GET_BESTSELLER_BOOKS_FAILURE:
      return { ...state, isGetBestsellerLoading: false, isGetBestsellerDone: false, isGetBestsellerError: action.error };
    case RESET_BOOKS:
      return { ...state, books: [] };
    default:
      return state;
  }
}

export default bookReducer;
