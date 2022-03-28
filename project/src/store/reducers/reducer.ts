import {combineReducers} from '@reduxjs/toolkit';
import {offers} from './offers';
import {utility} from './utility';
import {reviews} from './reviews';
import {NameSpaces} from '../../const';

const reducer = combineReducers({
  [NameSpaces.offers]: offers.reducer,
  [NameSpaces.utility]: utility.reducer,
  [NameSpaces.reviews]: reviews.reducer,
});

export {reducer};
