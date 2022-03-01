import {useState} from 'react';
import PlaceCard from '../../components/place-card/place-card';
import {Offer} from '../../types/offer';

type PlacesListProps = {
  offers: Offer[];
}

function PlacesList ({offers}: PlacesListProps): JSX.Element {

  const [, setActiveCard] = useState(0);

  const handleCardMouseOver = (id: number) => {
    setActiveCard(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map( (offer) => (
          <PlaceCard key={offer.id} offer={offer} onActiveCardChange={handleCardMouseOver}/>))
      }
    </div>
  );
}

export default PlacesList;
