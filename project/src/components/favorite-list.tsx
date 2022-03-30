import { Offer } from '../types/offer';
import FavoritePlaceCard from './favorite-place-card/favorite-place-card';

type FavoriteListProps = {
  favoriteOffers: Offer[],
}

function FavoriteList({favoriteOffers}: FavoriteListProps): JSX.Element {
  const favoriteCities = Array.from(new Set(favoriteOffers.map(({city}) => city.name)));

  return (
    <ul className="favorites__list">
      {
        favoriteCities.map( (city: string) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {
                favoriteOffers.filter((offer) => offer.city.name === city)
                  .map((offer) => <FavoritePlaceCard key={offer.id} offer={offer} />)
              }
            </div>
          </li>))
      }
    </ul>
  );
}

export default FavoriteList;
