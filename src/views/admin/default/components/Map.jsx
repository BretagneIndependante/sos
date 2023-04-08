import Card from "components/card";
import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';
import * as turf from '@turf/turf';

function Map(props) {
  const { lat, long } = props;
  mapboxgl.accessToken = "pk.eyJ1IjoiZGlub21hbGluIiwiYSI6ImNsZzc5MDZjdzBoZ2czZ3F5bjl5MGczMG0ifQ.Oo9ZHpmcJ6DdUsI8PKZ9VA";
  const [map, setMap] = useState(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lat, long],
      zoom: 15
    });

    // Ajout d'un disque rouge
    map.on('load', () => {
      const centerPoint = turf.point([lat, long]);
      const radiusInMeters = 20;
      const options = {steps: 64, units: 'meters', properties: {}};
      const circle = turf.circle(centerPoint, radiusInMeters, options);

      map.addLayer({
        'id': 'zone',
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': circle
        },
        'paint': {
          'fill-color': '#FF0000',
          'fill-opacity': 0.5
        }
      });
    });

    document.getElementsByClassName('mapboxgl-ctrl-attrib-inner')[0].classList.add('hidden');

  }, []);
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-4 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Carte
        </h2>
      </div>

      <div className="md:mt-16 lg:mt-2 h-96 rounded-[16px] overflow-hidden">
        <div id='map' className="h-96">
        </div>
      </div>
    </Card>
  );
};

export default Map;
