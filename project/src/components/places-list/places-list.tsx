import PlaceCard from '../../components/place-card/place-card';
import {Offer} from '../../types/offer';


type PlacesListProps = {
  offers: Offer[];
  handleOfferHover?: (id: number) => void;
  cardClasses: {
    CardClass: string,
    ImageWrapper: string,
    ListClass: string
  },
}

function PlacesList ({offers, handleOfferHover, cardClasses}: PlacesListProps): JSX.Element {

  const handleCardMouseOver = (id: number) => {
    handleOfferHover?.(id);
  };

  return (
    <div className={`${cardClasses.ListClass} places__list`}>
      {
        offers.map( (offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            onActiveCardChange={handleCardMouseOver}
            placeCardClasses={cardClasses}
          />))
      }
    </div>
  );
}

export default PlacesList;
