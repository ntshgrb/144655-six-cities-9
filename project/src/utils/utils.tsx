import {Offer} from '../types/offer';
import {SortingTypes} from '../const';
import {Review} from '../types/review';

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

const isEmpty = (value: string): boolean =>  value.trim() === '';

const sortReviews = (reviewsList: Review[]) => reviewsList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export {getCurrentOffers, isOffersListEmpty, sortOffers, isEmpty, sortReviews};

export const getRandomItem = (itemList: string[]) => {
  const randomIndex = Math.floor(Math.random() * itemList.length);
  return itemList[randomIndex];
};
