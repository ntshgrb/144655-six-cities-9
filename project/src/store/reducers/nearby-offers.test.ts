import {nearbyOffers} from './nearby-offers';
import {loadNearbyOffers, updateNearbyOffers} from './nearby-offers';
import {makeFakeOffer} from '../../utils/mocks';

const offers = new Array(3).fill(null).map(() => makeFakeOffer());

describe('Reducer: nearbyOffers', () => {
  it('without additional parameters should return initial state', () => {
    expect(nearbyOffers.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({nearbyOffers: []});
  });

  it('should update offers by load offers', () => {
    const state = {nearbyOffers: []};
    expect(nearbyOffers.reducer(state, loadNearbyOffers(offers)))
      .toEqual({nearbyOffers: offers});
  });

  it('should update one offer', () => {
    const state = {nearbyOffers: offers};
    expect(nearbyOffers.reducer(state, updateNearbyOffers(offers[0])))
      .toEqual({nearbyOffers: offers});
  });
});
