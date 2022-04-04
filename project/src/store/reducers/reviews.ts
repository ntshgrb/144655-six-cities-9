import {Review} from '../../types/review';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpaces} from '../../const';

type InitialState = {
  currenOfferReviews: Review[],
  reviewIsSending: boolean;
};

const initialState: InitialState = {
  currenOfferReviews: [],
  reviewIsSending: false,
};

export const reviews = createSlice({
  name: NameSpaces.reviews,
  initialState,
  reducers: {
    loadReviews: (state, action) => {
      state.currenOfferReviews = action.payload;
    },
    setLoadingStatus: (state, action) => {
      state.reviewIsSending = action.payload;
    },
    sendReviews: (state, action) => {
      state.currenOfferReviews = action.payload;
    },
  },
});

export const {loadReviews, sendReviews, setLoadingStatus} = reviews.actions;
