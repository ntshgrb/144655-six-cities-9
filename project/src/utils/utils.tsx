import {Offer} from '../types/offer';

const getCurrentOffers = (currentCity: string, offersList: Offer[]) => offersList.filter(({city}) => city.name === currentCity);

const isOffersListEmpty = (count: number) => (count <= 0);

export {getCurrentOffers, isOffersListEmpty};
