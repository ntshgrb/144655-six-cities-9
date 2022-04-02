import { createSlice } from '@reduxjs/toolkit';
import { NameSpaces } from '../../const';
import {Offer} from '../../types/offer';

type InitialState = {
  nearbyOffers: Offer[],
}

const initialState: InitialState = {
  nearbyOffers: [],
};


export const nearbyOffers = createSlice({
  name: NameSpaces.nearbyOffers,
  initialState,
  reducers: {
    loadNearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    updateNearbyOffers: (state, action) => {
      const index = state.nearbyOffers.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.nearbyOffers = [...state.nearbyOffers.slice(0, index), action.payload, ...state.nearbyOffers.slice(index + 1)];
      }
    },
  },
});

export const {loadNearbyOffers, updateNearbyOffers} = nearbyOffers.actions;


