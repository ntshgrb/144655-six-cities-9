import {Offer} from '../../types/offer';
import {Review} from '../../types/review';
import {DEFAULT_CITY} from '../../const';
import {createSlice} from '@reduxjs/toolkit';

type InitialState = {
  city: string,
  offersList: Offer[],
  isDataLoaded: boolean,
  currentOffer: Offer | null,
  currenOfferReviews: Review[],
  nearbyOffers: Offer[],
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offersList: [],
  isDataLoaded: false,
  currentOffer: null,
  currenOfferReviews: [],
  nearbyOffers: [],
};

export const offers = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCityAction: (state, action) => {
      state.city = action.payload;
    },
    loadOffers: (state, action) => {
      state.offersList = action.payload;
      state.isDataLoaded = true;
    },
    loadOffer: (state, action) => {
      state.currentOffer = action.payload;
    },
    loadReviews: (state, action) => {
      state.currenOfferReviews = action.payload;
    },
    loadNearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
  },
});

export const {changeCityAction, loadOffers, loadOffer, loadReviews, loadNearbyOffers} = offers.actions;
