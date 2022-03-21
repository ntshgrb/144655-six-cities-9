import {defaultCity, AuthorizationStatus} from '../const';
import {Offer} from '../types/offer';
import {createReducer} from '@reduxjs/toolkit';
import {changeCityAction, loadOffers, setError, requireAuthorization} from './action';

type InitialState = {
  city: string,
  offersList: Offer[],
  isDataLoaded: boolean,
  error: string,
  authorizationStatus: AuthorizationStatus
}

const initialState: InitialState = {
  city: defaultCity,
  offersList: [],
  isDataLoaded: false,
  error: '',
  authorizationStatus: AuthorizationStatus.Unknown,
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
    });
});

export {reducer};
