import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import {Offer} from '../../types/offer';
import {citiesList} from '../../const';
import {getCurrentOffers, isOffersListEmpty} from '../../utils/utils';
import CityOffers from '../../components/city-offers/city-offers';
import CityOffersEmpty from '../../components/city-offers/city-offers-empty';
import { useAppSelector } from '../../hooks';

type MainScreenProps = {
  offers: Offer[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.OFFERS.city);

  const currentOffers = getCurrentOffers(currentCity, offers);
  const placesCount = currentOffers.length;


  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${isOffersListEmpty(placesCount) ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              citiesList={citiesList}
              currentCity={currentCity}
            />
          </section>
        </div>
        <div className="cities">
          {
            isOffersListEmpty(placesCount) ?
              <div className="cities__places-container cities__places-container--empty container">
                <CityOffersEmpty
                  currentCity={currentCity}
                />
              </div> :
              <div className="cities__places-container container">
                <CityOffers
                  currentOffers={currentOffers}
                  placesCount={placesCount}
                  currentCity={currentCity}
                />
              </div>
          }
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
