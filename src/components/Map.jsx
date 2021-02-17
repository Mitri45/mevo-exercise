/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import MapGL, { GeolocateControl, NavigationControl } from 'react-map-gl';
// import * as MapboxDirections from '@mapbox/mapbox-gl-directions/src/index';
import mapSettings from '../utils/mapSettings';
export default function Map(props) {
  // eslint-disable-next-line object-curly-newline
  const {
    viewport,
    setViewport,
    markersToRender,
    zonesToRender,
    setUserPosition,
    setLocationEnabled,
    directionToTheCar,
  } = props;
  // const directions = new MapboxDirections({
  //   accessToken: mapSettings.accessToken,
  //   unit: 'metric',
  //   profile: 'mapbox/walking',
  // });

  return (
    <MapGL
      {...viewport}
      width='100%'
      height='100%'
      mapStyle='mapbox://styles/mapbox/streets-v9'
      onViewStateChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={mapSettings.accessToken}
      // addControl={directions}
    >
      {zonesToRender}
      {markersToRender}
      {directionToTheCar}

      <NavigationControl {...mapSettings.navigationControl} />
      <GeolocateControl
        {...mapSettings.geolocateControl}
        trackUserLocation
        onViewportChange={() => {
          setViewport({ ...viewport, zoom: 12 });
        }}
        onGeolocate={(coordObj) => {
          setUserPosition([
            coordObj.coords.longitude,
            coordObj.coords.latitude,
          ]);
          setLocationEnabled(true);
        }}
      />
    </MapGL>
  );
}

Map.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  viewport: PropTypes.object.isRequired,
  setViewport: PropTypes.func.isRequired,
  zonesToRender: PropTypes.object,
  markersToRender: PropTypes.array,
  setUserPosition: PropTypes.func,
  setLocationEnabled: PropTypes.func,
  directionToTheCar: PropTypes.object,
};

Map.defaultProps = {
  setUserPosition: '',
  zonesToRender: {} || [],
  markersToRender: [] || {},
  setLocationEnabled: '',
  directionToTheCar: {} || [],
};
