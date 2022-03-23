import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {AppRoute, AuthorizationStatus} from '../const';

export const changeCityAction = createAction<string>('main/changeCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadOffer = createAction<Offer>('data/loadOffer');

export const loadReviews = createAction<Review[]>('data/loadReview');

export const setError = createAction<string>('main/setError');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('login/redirectToRoute');

