import {Offer} from '../types/offer';
import {SortingTypes} from '../const';

const getCurrentOffers = (currentCity: string, offersList: Offer[]) => offersList.filter(({city}) => city.name === currentCity);

const isOffersListEmpty = (count: number) => (count <= 0);

const sortOffersLowToHigh = (offers: Offer[]) => offers.sort( (a, b) => a.price - b.price);
const sortOffersHighToLow = (offers: Offer[]) => offers.sort( (a, b) => b.price - a.price);
const sortOffersTopRatedFirst = (offers: Offer[]) => offers.sort( (a, b) => b.rating - a.rating);

const sortOffers = (offersList: Offer[], sortType: string) => {
  switch (sortType) {
    case SortingTypes.PriceLowToHigh:
      return sortOffersLowToHigh(offersList);
    case SortingTypes.PriceHighToLow:
      return sortOffersHighToLow(offersList);
    case SortingTypes.TopRatedFirst:
      return sortOffersTopRatedFirst(offersList);
    default:
      return offersList;
  }
};

export {getCurrentOffers, isOffersListEmpty, sortOffers};
