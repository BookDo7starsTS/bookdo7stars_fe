import '@testing-library/jest-dom';
// import { loginRequest } from '@/app/actions';
import { loginRequest } from '@/app/actions';
import LoginForm from '@/app/components/LoginForm';
import rootReducer from '@/app/reducers';
import rootSaga from '@/app/sagas';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  reducer: rootReducer,
});
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
const mockRouter = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => mockUseSelector,
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
}));

sagaMiddleware.run(rootSaga);

let emailInput: HTMLInputElement, passwordInput: HTMLInputElement, loginButton: HTMLButtonElement;

describe('LoginForm', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );
    emailInput = screen.getByLabelText('email');
    passwordInput = screen.getByLabelText('password');
    loginButton = screen.getByRole('button', { name: 'Login' });

    store.clearActions();
    jest.clearAllMocks();
  });

  it('should render all input fields and button for login', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  //fireEvent는 돔 이벤트 시뮬레이션하는 것
  it('should dispatch login request when login button is clicked', () => {
    fireEvent.change(emailInput, { target: { value: 'maychu@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '0909' } });
    fireEvent.click(loginButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const dispatchedAction = mockDispatch.mock.calls[0][0];

    expect(dispatchedAction).toEqual(
      loginRequest({
        email: 'maychu@gmail.com',
        password: '0909',
      }),
    );
  });
});
