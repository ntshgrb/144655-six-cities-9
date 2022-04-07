import {render, screen} from '@testing-library/react';
import {configureMockStore } from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import HistoryRouter from '../history-router/history-router';
import {NameSpaces} from '../../const';
import App from './app';
import * as Redux from 'react-redux';
import {makeFakeOffersList, listsLength, makeFakeOffer, makeReviewsList} from '../../utils/mocks';

const fakeOffers = makeFakeOffersList(listsLength.OffersLength);

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpaces.offers]: {
    isDataLoaded: true,
    offersList: fakeOffers,
  },
  [NameSpaces.utility]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render LoginScreen when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render FavoritesScreen when user navigate to "/favorites" and user is authorized', () => {
    history.push(AppRoute.Favorites);

    const fakeStore = mockStore({
      [NameSpaces.offers]: {
        isDataLoaded: true,
        offersList: fakeOffers,
        favoriteOffers: [],
      },
      [NameSpaces.utility]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render RoomScreen when user navigate to "/offer/:id"', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const fakeOffer = makeFakeOffer();
    const fakeOffersNearby = makeFakeOffersList(listsLength.OffersNearby);
    const fakeReviews = makeReviewsList(listsLength.ReviewsLength);

    history.push(AppRoute.RoomId + fakeOffer.id);

    const fakeStore = mockStore({
      [NameSpaces.offers]: {
        isDataLoaded: true,
        currentOffer: fakeOffer,
        favoriteOffers: [],
      },
      [NameSpaces.nearbyOffers]: {
        nearbyOffers: fakeOffersNearby,
      },
      [NameSpaces.utility]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpaces.reviews]: {
        currenOfferReviews: fakeReviews,
      },
    });

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigates to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to the homepage./i)).toBeInTheDocument();
  });

});
