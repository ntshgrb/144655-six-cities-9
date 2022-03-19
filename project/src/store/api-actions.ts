import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../const';
import {api} from '../store';
import {store} from '../store';
import {Offer} from '../types/offer';
import {loadOffers} from './action';

export const fetchOffersAction = createAsyncThunk(
  'data/loadOffers',
  async () => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    store.dispatch(loadOffers(data));
  },
);
