import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import MapGL from 'react-map-gl';

export default function Map(props) {
  const { mapboxApiAccessToken } = props;

  const [viewport, setViewport] = useState({
    latitude: -41.292757,
    longitude: 174.790984,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });

  return (
    <MapGL
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      bearing={viewport.bearing}
      pitch={viewport.pitch}
      scrollZoom={false}
      width='100vw'
      height='100vh'
      mapStyle='mapbox://styles/mapbox/light-v10'
      onViewportChange={setViewport}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  );
}

Map.propTypes = {
  mapboxApiAccessToken: PropTypes.string.isRequired,
};
