import {useEffect, useRef} from 'react';
import {Offer} from '../../types/offer';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';

type MapProps = {
  offers: Offer[];
  selectedOffer: Offer | undefined;
}

function Map({offers, selectedOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [28, 39],
    iconAnchor: [14, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [28, 39],
    iconAnchor: [14, 39],
  });

  useEffect(() => {
    if (map) {
      offers.forEach(({location, id}) => {
        leaflet
          .marker({
            lat: location.latitude,
            lng: location.longitude,
          }, {
            icon: (selectedOffer !== undefined && id === selectedOffer.id)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer, currentCustomIcon, defaultCustomIcon]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
