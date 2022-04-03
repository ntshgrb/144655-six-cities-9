import {DEFAULT_CITY} from '../../const';
import {offers} from './offers';
import {changeCityAction, loadOffers, loadOffer, updateCurrentOffer, loadFavoriteOffers, updateOfferFavoriteStatus} from './offers';
import {address} from 'faker';
import {makeFakeOffer} from '../../utils/mocks';
import {getRandomOfferIndex} from '../../utils/utils';

const fakeOffers = new Array(20).fill(null).map(() => makeFakeOffer());
const fakeFavoriteOffers = new Array(5).fill(null).map(() => makeFakeOffer()).map((offer) => ({...offer, isFavorite: true}));
const fakeOffer = makeFakeOffer();

describe('Reducer: offers', () => {
  it('without additional parameters should return initial state', () => {
    expect(offers.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        city: DEFAULT_CITY,
        offersList: [],
        isDataLoaded: false,
        currentOffer: null,
        favoriteOffers: [],
      });
  });

  it('should update city after changing filter', () => {
    const state = {
      city: DEFAULT_CITY,
      offersList: [],
      isDataLoaded: false,
      currentOffer: null,
      favoriteOffers: [],
    };

    const fakeCity = address.city();

    expect(offers.reducer(state, changeCityAction(fakeCity)))
      .toEqual({
        city: fakeCity,
        offersList: [],
        isDataLoaded: false,
        currentOffer: null,
        favoriteOffers: [],
      });
  });

  it('should load offers', () => {
    const state = {
      city: DEFAULT_CITY,
      offersList: [],
      isDataLoaded: false,
      currentOffer: null,
      favoriteOffers: [],
    };

    expect(offers.reducer(state, loadOffers(fakeOffers)))
      .toEqual({
        city: DEFAULT_CITY,
        offersList: fakeOffers,
        isDataLoaded: true,
        currentOffer: null,
        favoriteOffers: [],
      });
  });

  it('should load one actual offer', () => {
    const state = {
      city: DEFAULT_CITY,
      offersList: fakeOffers,
      isDataLoaded: true,
      currentOffer: null,
      favoriteOffers: [],
    };

    expect(offers.reducer(state, loadOffer(fakeOffer)))
      .toEqual({
        city: DEFAULT_CITY,
        offersList: fakeOffers,
        isDataLoaded: true,
        currentOffer: fakeOffer,
        favoriteOffers: [],
      });
  });

  it('should update current offer', () => {
    const state = {
      city: DEFAULT_CITY,
      offersList: fakeOffers,
      isDataLoaded: true,
      currentOffer: fakeOffer,
      favoriteOffers: [],
    };

    const updatedFakeOffer = {...fakeOffer, isFavorite: !fakeOffer.isFavorite};

    expect(offers.reducer(state, updateCurrentOffer(updatedFakeOffer)))
      .toEqual({
        city: DEFAULT_CITY,
        offersList: fakeOffers,
        isDataLoaded: true,
        currentOffer: updatedFakeOffer,
        favoriteOffers: [],
      });
  });

  it('shouldn\'t change initial state if current offer id doesn\'t match updated offer id', () => {
    const state = {
      city: DEFAULT_CITY,
      offersList: fakeOffers,
      isDataLoaded: true,
      currentOffer: fakeOffer,
      favoriteOffers: [],
    };

    const updatedFakeOffer = makeFakeOffer();

    expect(offers.reducer(state, updateCurrentOffer(updatedFakeOffer)))
      .toEqual({
        city: DEFAULT_CITY,
        offersList: fakeOffers,
        isDataLoaded: true,
        currentOffer: fakeOffer,
        favoriteOffers: [],
      });
  });

  it('should load favorite offers', () => {
    const state = {
      city: DEFAULT_CITY,
      offersList: fakeOffers,
      isDataLoaded: true,
      currentOffer: fakeOffer,
      favoriteOffers: [],
    };

    expect(offers.reducer(state, loadFavoriteOffers(fakeFavoriteOffers)))
      .toEqual({
        city: DEFAULT_CITY,
        offersList: fakeOffers,
        isDataLoaded: true,
        currentOffer: fakeOffer,
        favoriteOffers: fakeFavoriteOffers,
      });
  });

  it('should update status of an offer from favorite offers list', () => {
    const randomIndex = getRandomOfferIndex(fakeFavoriteOffers);
    const fakeUpdatedFavoriteOffer = {...fakeFavoriteOffers[randomIndex], isFavorite: false};
    const fakeOffersToUpdate = [...fakeOffers, fakeFavoriteOffers[randomIndex]];

    const state = {
      city: DEFAULT_CITY,
      offersList: fakeOffersToUpdate,
      isDataLoaded: true,
      currentOffer: fakeOffer,
      favoriteOffers: fakeFavoriteOffers,
    };

    expect(offers.reducer(state, updateOfferFavoriteStatus(fakeUpdatedFavoriteOffer)))
      .toEqual({
        city: DEFAULT_CITY,
        offersList: [...fakeOffers, fakeUpdatedFavoriteOffer],
        isDataLoaded: true,
        currentOffer: fakeOffer,
        favoriteOffers: [...fakeFavoriteOffers.slice(0, randomIndex), ...fakeFavoriteOffers.slice(randomIndex + 1)],
      });
  });
});
