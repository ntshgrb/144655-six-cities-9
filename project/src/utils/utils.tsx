import {Offer} from '../types/offer';

const getCurrentOffers = (currentCity: string, offersList: Offer[]) => offersList.filter(({city}) => city.name === currentCity);

export {getCurrentOffers};
