import {useEffect, useRef, CSSProperties} from 'react';
import {Offer} from '../../types/offer';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import {City} from '../../types/city';
import {iconSize, DEFAULT_PIN, ACTIVE_PIN} from '../../map-settings';

type MapProps = {
  currentCityInfo: City,
  offers: Offer[];
  selectedOffer: Offer | undefined;
  className: string;
  mapHeight: CSSProperties;
}

function Map({currentCityInfo, offers, selectedOffer, className, mapHeight}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCityInfo);


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
  }, [currentCityInfo, map, offers, selectedOffer, currentCustomIcon, defaultCustomIcon]);

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
