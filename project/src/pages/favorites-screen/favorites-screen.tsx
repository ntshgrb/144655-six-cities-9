import {Navigate} from 'react-router-dom';
import FavoritePlaceCard from '../../components/favorite-place-card/favorite-place-card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Offer} from '../../types/offer';
import {useAppSelector} from '../../hooks/index';
import {AppRoute, AuthorizationStatus} from '../../const';

type FavoritesScreenProps = {
  offers: Offer[];
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.utility.authorizationStatus);

  if (authStatus !== AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Login} />;
  }

  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const favoriteCities = Array.from(new Set(favoriteOffers.map(({city}) => city.name)));

  return (
    <>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
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
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FavoritesScreen;
