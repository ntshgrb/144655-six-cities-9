import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';

const changeCityAction = createAction<string>('main/changeCity');

const setOffersListAction = createAction<Offer[]>('main/setOffersList');

export {changeCityAction, setOffersListAction};
