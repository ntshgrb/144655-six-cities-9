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
  areFavoriteOffersLoaded: boolean,
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offersList: [],
  isDataLoaded: false,
  currentOffer: null,
  nearbyOffers: [],
  favoriteOffers: [],
  areFavoriteOffersLoaded: false,
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
    loadNearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    loadFavoriteOffers: (state, action) => {
      state.favoriteOffers = action.payload;
      state.areFavoriteOffersLoaded = true;
    },
    updateOfferFavoriteStatus: (state, action) => {
      const index = state.offersList.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.offersList[index].isFavorite = !state.offersList[index].isFavorite;
      }
      state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
    },
  },
});

export const {changeCityAction, loadOffers, loadOffer, loadNearbyOffers, loadFavoriteOffers, updateOfferFavoriteStatus} = offers.actions;
