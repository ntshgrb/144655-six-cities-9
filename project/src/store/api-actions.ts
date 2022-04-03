import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, TIMEOUT_SHOW_ERROR, AuthorizationStatus, AppRoute} from '../const';

import {AxiosInstance} from 'axios';

// import {api} from '../store';
// import {store} from '../store';

import {AppDispatch, State} from '../types/state';

import {Offer} from '../types/offer';
import {redirectToRoute} from './action';
import {loadOffers, loadOffer, loadFavoriteOffers, updateOfferFavoriteStatus, updateCurrentOffer} from './reducers/offers';
import {loadNearbyOffers, updateNearbyOffers} from './reducers/nearby-offers';
import {loadReviews, sendReviews} from './reducers/reviews';
import {setError, requireAuthorization} from './reducers/utility';
import {errorHandle} from '../sevrices/error-handle';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from '../sevrices/token';
import {Review} from '../types/review';
import {NewReview} from '../types/new-review';
import {FavoriteData} from '../types/favorite-data';
import {deleteEmail, saveUserEmail} from '../sevrices/user-email';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffer',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(loadOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const toggleFavoriteAction = createAsyncThunk<void, FavoriteData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/toggleFavorite',
  async ({id, status}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Offer>(`${APIRoute.Favorites}/${id}/${status}`);
      dispatch(updateOfferFavoriteStatus(data));
      dispatch(updateCurrentOffer(data));
      dispatch(updateNearbyOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoriteOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Favorites);
      dispatch(loadFavoriteOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadReview',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadNearbyOffers',
  async(offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(loadNearbyOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post(APIRoute.Login, {email, password});
      saveToken(data.token);
      saveUserEmail(data.email);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      deleteEmail();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const postReviewAction = createAsyncThunk<void, NewReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postReview',
  async ({comment, rating, offerId},  {dispatch, extra: api}) => {
    try {
      const {data} = await api.post(`${APIRoute.Comments}/${offerId}`, {comment, rating});
      dispatch(sendReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State
}>(
  'main/clearError',
  (_arg, {dispatch}) => {
    setTimeout(
      () => dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
