import {useState} from 'react';
import PlaceCard from '../../components/place-card/place-card';
import {Offer} from '../../types/offer';

type PlacesListProps = {
  offers: Offer[];
  onOfferHover: (id: number) => void;
}

function PlacesList ({offers, onOfferHover}: PlacesListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(0);

  const handleCardMouseOver = (id: number) => {
    onOfferHover(activeCard);
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
