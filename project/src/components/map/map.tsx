import {useEffect, useRef, CSSProperties} from 'react';
import {Offer} from '../../types/offer';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import {iconSize, DEFAULT_PIN, ACTIVE_PIN} from '../../map-settings';

type MapProps = {
  offers: Offer[];
  selectedOffer: Offer | undefined;
  className: string;
  mapHeight: CSSProperties;
}

function Map({offers, selectedOffer, className, mapHeight}: MapProps): JSX.Element {
  const city = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: DEFAULT_PIN,
    iconSize: [iconSize.Width, iconSize.Height],
    iconAnchor: [iconSize.Width/2, iconSize.Height],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: ACTIVE_PIN,
    iconSize: [iconSize.Width, iconSize.Height],
    iconAnchor: [iconSize.Width/2, iconSize.Height],
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
      className={`${className} map`}
      style={mapHeight}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
