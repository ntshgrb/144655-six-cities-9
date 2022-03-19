import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {api} from '../store';
import {store} from '../store';
import {Offer} from '../types/offer';
import {loadOffers, setError} from './action';
import {errorHandle} from '../sevrices/error-handle';

export const fetchOffersAction = createAsyncThunk(
  'data/loadOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const clearErrorAction = createAsyncThunk(
  'main/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
