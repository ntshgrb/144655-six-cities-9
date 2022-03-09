import {useState} from 'react';
import PlaceCard from '../../components/place-card/place-card';
import {Offer} from '../../types/offer';


type PlacesListProps = {
  offers: Offer[];
  onOfferHover?: (id: number) => void;
  cardClasses: {
    CardClass: string,
    ImageWrapper: string,
    ListClass: string
  },
}

function PlacesList ({offers, onOfferHover, cardClasses}: PlacesListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(0);

  const handleCardMouseOver = (id: number) => {
    onOfferHover?.(activeCard);
    setActiveCard(id);
  };

  return (
    <div className={`${cardClasses.ListClass} places__list`}>
      {
        offers.map( (offer) => (
          <PlaceCard key={offer.id} offer={offer} onActiveCardChange={handleCardMouseOver} placeCardClasses={cardClasses}/>))
      }
    </div>
  );
}

export default PlacesList;
