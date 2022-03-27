import {Review} from '../../types/review';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpaces} from '../../const';

type InitialState = {
  currenOfferReviews: Review[],
};

const initialState: InitialState = {
  currenOfferReviews: [],
};

export const reviews = createSlice({
  name: NameSpaces.reviews,
  initialState,
  reducers: {
    loadReviews: (state, action) => {
      state.currenOfferReviews = action.payload;
    },
    sendReviews: (state, action) => {
      state.currenOfferReviews = action.payload;
    },
  },
});

export const {loadReviews, sendReviews} = reviews.actions;
