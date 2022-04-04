import {memo, useCallback, useState} from 'react';
import PlacesList from '../places-list/places-list';
import Map from '../map/map';
import PlacesSorting from '../places-sorting/places-sorting';
import {Offer} from '../../types/offer';
import {MainCardClasses, SortingTypes} from '../../const';
import {MAIN_MAP_HEIGHT} from '../../map-settings';
import {sortOffers} from '../../utils/utils';


type CityOffersProps = {
  currentOffers: Offer[],
  placesCount: number,
  currentCity: string,
}

function CityOffers ({currentOffers, placesCount, currentCity}: CityOffersProps): JSX.Element {

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);
  const [placesSorting, setplacesSorting] = useState<string>(SortingTypes.Popular);

  const currentCityInfo = currentOffers[0].city;

  const handleOfferHover = (offerId: number) => {
    const activeOffer = currentOffers.find((offer) => offer.id === offerId);
    setSelectedOffer(activeOffer);
  };

  const handleSortingChange = useCallback((sortingType: string) => {
    setplacesSorting(sortingType);
  }, []);


  const sortedCurrentOffers = sortOffers([...currentOffers], placesSorting);

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{placesCount} places to stay in {currentCity}</b>

        <PlacesSorting
          handleSortingChange={handleSortingChange}
          placesSorting={placesSorting}
        />

        <PlacesList
          offers={sortedCurrentOffers}
          handleOfferHover={handleOfferHover}
          cardClasses={MainCardClasses}
        />

      </section>
      <div className="cities__right-section">

        <Map
          key={currentCity}
          currentCityInfo={currentCityInfo}
          offers={currentOffers}
          selectedOffer={selectedOffer}
          className={'cities__map'}
          mapHeight={MAIN_MAP_HEIGHT}
        />

      </div>
    </>
  );
}

export default memo(CityOffers);
