import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import LoginScreen from './login-screen';
import { AuthorizationStatus, NameSpaces } from '../../const';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpaces.utility]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
});

describe('Component: LoginScreen', () => {
  it('should render LoginScreen when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();

  });
});
