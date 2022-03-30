import {Navigate} from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {useAppSelector} from '../../hooks/index';
import {AppRoute, AuthorizationStatus} from '../../const';
import {store} from '../../store';
import {fetchFavoriteOffers} from '../../store/api-actions';
import {useEffect} from 'react';
import FavoriteList from '../../components/favorite-list';
import LoadingScreen from '../../components/loading-screen/loading-screen';

function FavoritesScreen(): JSX.Element {
  useEffect(() => {
    store.dispatch(fetchFavoriteOffers());
  }, []);


  const authStatus = useAppSelector((state) => state.UTILITY.authorizationStatus);
  const favoriteOffers = useAppSelector((state) => state.OFFERS.favoriteOffers);
  const isDataLoaded = useAppSelector((state) => state.OFFERS.areFavoriteOffersLoaded);

  if (authStatus !== AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Login} />;
  }

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  const isEmpty = favoriteOffers.length === 0;

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
                <FavoriteList favoriteOffers={favoriteOffers} />
              </section>
          }
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
