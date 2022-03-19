import {defaultCity} from '../const';
import {Offer} from '../types/offer';
import {createReducer} from '@reduxjs/toolkit';
import {changeCityAction, loadOffers} from './action';

type InitialState = {
  city: string,
  offersList: Offer[],
}

const initialState: InitialState = {
  city: defaultCity,
  offersList: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offersList = action.payload;
    });
});

export {reducer};
