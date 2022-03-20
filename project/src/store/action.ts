import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';

const changeCityAction = createAction<string>('main/changeCity');

const loadOffers = createAction<Offer[]>('data/loadOffers');

const setError = createAction<string>('main/setError');

export {changeCityAction, loadOffers, setError};
