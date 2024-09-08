import '@testing-library/jest-dom';
import { getBooksByGroupNameRequest } from '@/app/actions/types';
import BooksContainerForGroupName from '@/app/components/Book/BooksContainer';
import rootReducer from '@/app/reducers';
import rootSaga from '@/app/sagas';
import { getBooksByGroupName  } from '@/app/sagas/book';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware, { runSaga } from 'redux-saga';

import { mockBooks } from '../../../mocks/Books';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  reducer: rootReducer,
});
const mockDispatch = jest.fn();
const mockRouter = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(
    (selector) => selector({ book: { books: mockBooks } }), // mockBooks를 반환
  ),
}));

sagaMiddleware.run(rootSaga);

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
}));

jest.mock('axios');

describe('itemNewSpecial', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
    jest.resetModules();

    render(
      <Provider store={store}>
        <BooksContainerForGroupName books={mockBooks} title={'Item New Special Books'} />
      </Provider>,
    );
  });

  it('should handle successful API call', async () => {
    const mockBooks = { data: { books: [{ id: 1, title: 'Book 1' }] } }; // Mocked data
    (axios.get as jest.Mock).mockResolvedValueOnce(mockBooks);
    const action = getBooksByGroupNameRequest('ItemNewAll', 1, 20);

    const dispatchedActions: any[] = [];
    await runSaga(
      {
        dispatch: (action: any) => dispatchedActions.push(action),
        getState: () => ({}),
      },
      getBooksByGroupName,
      action,
    ).toPromise();

    expect(dispatchedActions).toContainEqual({
      type: 'GET_BOOKS_GROUPNAME_SUCCESS',
      payload: mockBooks.data.books,
    });
  });

  it('should handle fail API call 500', async () => {
    const mockBooks = {
      response: {
        status: 500,
        data: {
          message: 'Error loading books',
        },
      },
    }; // Mocked data
    (axios.get as jest.Mock).mockRejectedValueOnce(mockBooks);

    const action = getBooksByGroupNameRequest('ItemNewAll', 1, 20);

    const dispatchedActions: any[] = [];
    await runSaga(
      {
        dispatch: (action: any) => dispatchedActions.push(action),
        getState: () => ({}),
      },
      getBooksByGroupName,
      action,
    ).toPromise();

    expect(dispatchedActions).toContainEqual({
      type: 'GET_BOOKS_GROUPNAME_FAILURE',
      error: 'Error loading books',
    });
  });

  it('should handle fail API call', async () => {
    const mockBooks = undefined; // Mocked data
    (axios.get as jest.Mock).mockResolvedValueOnce(mockBooks);
    const action = getBooksByGroupNameRequest('ItemNewAll', 1, 20);

    const dispatchedActions: any[] = [];
    await runSaga(
      {
        dispatch: (action: any) => dispatchedActions.push(action),
        getState: () => ({}),
      },
      getBooksByGroupName,
      action,
    ).toPromise();

    expect(dispatchedActions).toContainEqual({
      type: 'GET_BOOKS_GROUPNAME_FAILURE',
      error: undefined,
    });
  });

  it('should render at least one BookCard, when the component is rendered with books data ', () => {
    const bookCards = screen.getAllByTestId('book-card');
    expect(bookCards.length).toBeGreaterThan(0);
  });

  it('should render the correct number of BookCard components', () => {
    expect(screen.getAllByTestId('book-card').length).toBe(mockBooks.length);
  });
});
