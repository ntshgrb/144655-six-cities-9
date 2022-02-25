import PlaceCard from '../../components/place-card/place-card';
import {Offer} from '../../types/offer';

type PlacesListProps = {
  offers: Offer[];
}

function PlacesList ({offers}: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map( (offer) => <PlaceCard key={offer.id} offer={offer} />)
      }

    </div>
  );
}

export default PlacesList;
