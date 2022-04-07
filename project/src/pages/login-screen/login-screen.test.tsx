import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-router/history-router';
import LoginScreen from './login-screen';
import {AuthorizationStatus} from '../../const';
import {NameSpaces} from '../../const';

const mockStore = configureMockStore();

describe('Component: LoginScreen', () => {
  it('should render "LoginScreen" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({[NameSpaces.utility]: {authorizationStatus: AuthorizationStatus.NoAuth}})}>
        <HistoryRouter history={history} >
          <LoginScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'traveller');
    userEvent.type(screen.getByTestId('password'), 'qwerty');

    expect(screen.getByDisplayValue(/traveller/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/qwerty/i)).toBeInTheDocument();
  });
});
