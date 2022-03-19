import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';

const changeCityAction = createAction<string>('main/changeCity');

const loadOffers = createAction<Offer[]>('data/loadOffers');

export {changeCityAction, loadOffers};
