import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {AuthorizationStatus} from '../const';

const changeCityAction = createAction<string>('main/changeCity');

const loadOffers = createAction<Offer[]>('data/loadOffers');

const setError = createAction<string>('main/setError');

const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export {changeCityAction, loadOffers, setError, requireAuthorization};
