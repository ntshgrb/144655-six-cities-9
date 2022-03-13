import {useEffect, useState, MutableRefObject} from 'react';
import leaflet from 'leaflet';
import {Map} from 'leaflet';
import {City} from '../types/city';
import 'leaflet/dist/leaflet.css';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const {location} = city;

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet
        .tileLayer(
          'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          },
        )
        .addTo(instance);

      setMap(instance);
    }
  }, [mapRef, map, location]);

  return map;
}

export default useMap;
