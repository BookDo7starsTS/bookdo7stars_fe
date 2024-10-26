// 서치페이지 렌더링되는지, 디스페치 날라가는지
import '@testing-library/jest-dom';
import { getBooksSearchFailure, getBooksSearchRequest, getBooksSearchSuccess } from '@/app/actions/types';
import Search from '@/app/search/page';
import SearchResult from '@/app/search/result/page';
import rootReducer from '@/app/reducers';
import rootSaga from '@/app/sagas';
import {getBookSearch} from '@app/sagas/book';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware, { runSaga } from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  reducer: rootReducer,
});
const mockDispatch = jest.fn();
const mockRouter = jest.fn();
sagaMiddleware.run(rootSaga);
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
}));
jest.mock('axios');

describe('SearchContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
    jest.resetModules();
    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );
  });
  it('should render SearchContainer ', () => {
    const textFields = screen.getAllByRole('textbox');
    expect(textFields.length).toEqual(4);
  });
});
