import {combineReducers} from '@reduxjs/toolkit';
import {offers} from './offers';
import {utility} from './utility';

const reducer = combineReducers({
  offers: offers.reducer,
  utility: utility.reducer,
});

export {reducer};
