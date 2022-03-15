import {offers} from '../mocks/offers';
import {defaultCity} from '../const';
import {createReducer} from '@reduxjs/toolkit';
import {changeCityAction, setOffersListAction} from './action';


const initialState = {
  city: defaultCity,
  offersList: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffersListAction, (state, action) => {
      state.offersList = action.payload;
    });
});

export {reducer};
