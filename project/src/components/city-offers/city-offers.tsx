import {useState} from 'react';
import PlacesList from '../places-list/places-list';
import Map from '../map/map';
import PlacesSorting from '../places-sorting/places-sorting';
import {Offer} from '../../types/offer';
import {MainCardClasses} from '../../const';
import {MAIN_MAP_HEIGHT} from '../../map-settings';


type CityOffersProps = {
  currentOffers: Offer[],
  placesCount: number,
  currentCity: string,
}

function CityOffers ({currentOffers, placesCount, currentCity}: CityOffersProps): JSX.Element {

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const currentCityInfo = currentOffers[0].city;

  const onOfferHover = (offerId: number) => {
    const activeOffer = currentOffers.find((offer) => offer.id === offerId);
    setSelectedOffer(activeOffer);
  };

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{placesCount} places to stay in {currentCity}</b>

        <PlacesSorting />

        <PlacesList
          offers={currentOffers}
          onOfferHover={onOfferHover}
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

export default CityOffers;
