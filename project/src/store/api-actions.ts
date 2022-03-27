import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, TIMEOUT_SHOW_ERROR, AuthorizationStatus, AppRoute} from '../const';
import {api} from '../store';
import {store} from '../store';
import {Offer} from '../types/offer';
import {redirectToRoute} from './action';
import {loadOffers, loadOffer, loadNearbyOffers} from './reducers/offers';
import {loadReviews, sendReviews} from './reducers/reviews';
import {setError, requireAuthorization} from './reducers/utility';
import {errorHandle} from '../sevrices/error-handle';
import {AuthData} from '../types/auth-data';
import {saveToken} from '../sevrices/token';
import {Review} from '../types/review';
import {NewReview} from '../types/new-review';
import {saveUserEmail} from '../sevrices/user-email';

export const fetchOffersAction = createAsyncThunk(
  'data/loadOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOfferAction = createAsyncThunk(
  'data/loadOffer',
  async (offerId: number) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      store.dispatch(loadOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/loadReview',
  async(offerId: number) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk(
  'data/loadNearbyOffers',
  async(offerId: number) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      store.dispatch(loadNearbyOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data} = await api.post(APIRoute.Login, {email, password});
      saveToken(data.token);
      saveUserEmail(data.email);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const postReviewAction = createAsyncThunk(
  'data/postReview',
  async ({comment, rating, offerId}: NewReview) => {
    try {
      const {data} = await api.post(`${APIRoute.Comments}/${offerId}`, {comment, rating});
      store.dispatch(sendReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const clearErrorAction = createAsyncThunk(
  'main/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
