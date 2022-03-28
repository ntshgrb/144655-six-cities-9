type RoomFeaturesProps = {
  placeType: string,
  bedrooms: number,
  maxAdults: number,
}

function RoomFeatures ({placeType, bedrooms, maxAdults}: RoomFeaturesProps): JSX.Element {
  return (
    <ul className="property__features">
      <li className="property__feature property__feature--entire">
        {placeType}
      </li>
      <li className="property__feature property__feature--bedrooms">
        {bedrooms} Bedrooms
      </li>
      <li className="property__feature property__feature--adults">
        Max {maxAdults} adults
      </li>
    </ul>
  );
}

export default RoomFeatures;
