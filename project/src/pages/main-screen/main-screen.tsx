import {useState} from 'react';
import PlacesList from '../../components/places-list/places-list';
import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import Map from '../../components/map/map';
import {Offer} from '../../types/offer';
import {MAIN_MAP_HEIGHT} from '../../map-settings';
import {MainCardClasses, citiesList} from '../../const';
import {useAppSelector} from '../../hooks/';
import {getCurrentOffers} from '../../utils/utils';

type MainScreenProps = {
  offers: Offer[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const currentCity = useAppSelector((state) => state.city);

  const currentOffers = getCurrentOffers(currentCity, offers);
  const placesCount = currentOffers.length;

  const onOfferHover = (offerId: number) => {
    const activeOffer = offers.find((offer) => offer.id === offerId);
    setSelectedOffer(activeOffer);
  };


  return (
    <>
      <Header />
      <main className="page__main page__main--index">
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
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>

              <PlacesList
                offers={currentOffers}
                onOfferHover={onOfferHover}
                cardClasses={MainCardClasses}
              />

            </section>
            <div className="cities__right-section">
              <Map
                offers={currentOffers}
                selectedOffer={selectedOffer}
                className={'cities__map'}
                mapHeight={MAIN_MAP_HEIGHT}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainScreen;
