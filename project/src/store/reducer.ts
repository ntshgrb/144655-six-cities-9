import {defaultCity, AuthorizationStatus} from '../const';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {createReducer} from '@reduxjs/toolkit';
import {changeCityAction, loadOffers, setError, requireAuthorization, loadOffer, loadReviews} from './action';

type InitialState = {
  city: string,
  offersList: Offer[],
  isDataLoaded: boolean,
  error: string,
  authorizationStatus: AuthorizationStatus,
  currentOffer: Offer | null,
  currenOfferReviews: Review[],
}

const initialState: InitialState = {
  city: defaultCity,
  offersList: [],
  isDataLoaded: false,
  error: '',
  authorizationStatus: AuthorizationStatus.Unknown,
  currentOffer: null,
  currenOfferReviews: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offersList = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.currenOfferReviews = action.payload;
    });
});

export {reducer};
