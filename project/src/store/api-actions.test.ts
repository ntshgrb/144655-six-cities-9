import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../sevrices/api';
import {checkAuthAction, loginAction, logoutAction, fetchOffersAction, fetchOfferAction, toggleFavoriteAction, fetchFavoriteOffers, fetchReviewsAction, fetchNearbyOffersAction, postReviewAction} from './api-actions';
import {requireAuthorization} from './reducers/utility';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {listsLength, makeFakeOffersList, makeFakeOffer, makeReviewsList, makeFakeComment} from '../utils/mocks';
import { loadFavoriteOffers, loadOffer, loadOffers, updateCurrentOffer, updateOfferFavoriteStatus } from './reducers/offers';
import {datatype} from 'faker';
import { loadNearbyOffers, updateNearbyOffers } from './reducers/nearby-offers';
import { loadReviews, sendReviews } from './reducers/reviews';

const mockOffers = makeFakeOffersList(listsLength.OffersLength);
const mockOffersNearby = makeFakeOffersList(listsLength.OffersNearby);
const mockReviews = makeReviewsList(listsLength.ReviewsLength);
const mockFavoriteOffers = makeFakeOffersList(listsLength.FavoritesLength);
const mockOffer = makeFakeOffer();
const mockComment = makeFakeComment();
const mockStatus = +datatype.boolean();

describe('Async action', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'email@email.com', password: 'qwerty'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'token', email: 'email@email.com'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(2);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'token');
    expect(Storage.prototype.setItem).toBeCalledWith('email', 'email@email.com');
  });

  it('should dispatch Logout when Delete / logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(2);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
    expect(Storage.prototype.removeItem).toBeCalledWith('email');
  });

  it('should dispatch loadOffers when GET /hotels', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOffers.toString());
  });

  it('should dispatch loadOffer when GET /hotels/{hotelId}', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${mockOffer.id}`)
      .reply(200, mockOffer);

    const store = mockStore();
    await store.dispatch(fetchOfferAction(mockOffer.id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOffer.toString());
  });

  it('should dispatch updateOfferFavoriteStatus, updateCurrentOffer, updateNearbyOffers when POST /favorite/{hotelId}/{status}', async () => {
    mockAPI
      .onPost((`${APIRoute.Favorites}/${mockOffer.id}/${mockStatus}`))
      .reply(200, mockOffer);

    const store = mockStore();
    await store.dispatch(toggleFavoriteAction({id: mockOffer.id, status: mockStatus}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(updateOfferFavoriteStatus.toString());
    expect(actions).toContain(updateCurrentOffer.toString());
    expect(actions).toContain(updateNearbyOffers.toString());
  });

  it('should dispatch loadFovoriteOffers when GET /favorite', async () => {
    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, mockFavoriteOffers);

    const store = mockStore();
    await store.dispatch(fetchFavoriteOffers());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavoriteOffers.toString());
  });

  it('should dispatch loadReviews when GET /comments/{hotelId}', async () => {
    mockAPI
      .onGet(`${APIRoute.Comments}/${mockOffer.id}`)
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(mockOffer.id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadReviews.toString());
  });

  it('should dispatch loadNearbyOffers when GET /hotels/{hotelId}/nearby', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${mockOffer.id}/nearby`)
      .reply(200, mockOffersNearby);

    const store = mockStore();
    await store.dispatch(fetchNearbyOffersAction(mockOffer.id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadNearbyOffers.toString());
  });

  it('should dispatch sendReviews when POST /comments/{hotelId}', async () => {
    mockAPI
      .onPost(`${APIRoute.Comments}/${mockComment.offerId}`)
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(postReviewAction(mockComment));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(sendReviews.toString());
  });
});
