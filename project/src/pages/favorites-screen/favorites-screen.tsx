import {Navigate} from 'react-router-dom';
import FavoritePlaceCard from '../../components/favorite-place-card/favorite-place-card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {useAppSelector} from '../../hooks/index';
import {AppRoute, AuthorizationStatus} from '../../const';


function FavoritesScreen(): JSX.Element {
  const authStatus = useAppSelector((state) => state.UTILITY.authorizationStatus);
  const favoriteOffers = useAppSelector((state) => state.OFFERS.favoriteOffers);

  if (authStatus !== AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Login} />;
  }

  const isEmpty = favoriteOffers.length === 0;

  const favoriteCities = Array.from(new Set(favoriteOffers.map(({city}) => city.name)));

  return (
    <div
      className={`page ${isEmpty ? 'page--favorites-empty' : ''}`}
    >
      <Header />
      <main
        className={`page__main page__main--favorites ${isEmpty ? 'page__main--favorites-empty' : ''}`}
      >
        <div className="page__favorites-container container">
          {
            isEmpty ?
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </section> :
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
          }
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
