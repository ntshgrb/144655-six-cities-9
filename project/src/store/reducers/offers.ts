import {Offer} from '../../types/offer';
import {DEFAULT_CITY} from '../../const';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpaces} from '../../const';

type InitialState = {
  city: string,
  offersList: Offer[],
  isDataLoaded: boolean,
  currentOffer: Offer | null,
  nearbyOffers: Offer[],
  favoriteOffers: Offer[],
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offersList: [],
  isDataLoaded: false,
  currentOffer: null,
  nearbyOffers: [],
  favoriteOffers: [],
};

export const offers = createSlice({
  name: NameSpaces.offers,
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
    updateCurrentOffer: (state, action) => {
      if (state.currentOffer && action.payload.id === state.currentOffer.id) {
        state.currentOffer = action.payload;
      }
    },
    loadNearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    loadFavoriteOffers: (state, action) => {
      state.favoriteOffers = action.payload;
    },
    updateOfferFavoriteStatus: (state, action) => {
      const index = state.offersList.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.offersList = [...state.offersList.slice(0, index), action.payload, ...state.offersList.slice(index + 1)];
      }
      state.favoriteOffers = action.payload.isFavorite ?
        [...state.favoriteOffers, action.payload] :
        state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
    },
    updateNearbyOffers: (state, action) => {
      const index = state.nearbyOffers.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.nearbyOffers = [...state.nearbyOffers.slice(0, index), action.payload, ...state.nearbyOffers.slice(index + 1)];
      }
    },
  },
});

export const {changeCityAction, loadOffers, loadOffer, loadNearbyOffers, loadFavoriteOffers, updateOfferFavoriteStatus, updateCurrentOffer, updateNearbyOffers} = offers.actions;
