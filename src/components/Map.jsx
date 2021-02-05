/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import MapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Source,
  Layer,
} from 'react-map-gl';
import mapSettings from '../utils/mapSettings';

export default function Map(props) {
  const { mapboxApiAccessToken, viewport, setViewport } = props;
  const [zonesToRender, setZonesToRender] = useState([]);
  const [zonesError, setZonesError] = useState(null);

  useEffect(() => {
    fetch('https://api.mevo.co.nz/public/home-zones/all')
      .then((res) => res.json())
      .then(
        (resultData) => {
          setZonesToRender(
            <Source type='geojson' data={resultData.data} id='geoDataSource'>
              <Layer {...mapSettings.layer.zonesFadeInStyle} />
              <Layer {...mapSettings.layer.zonesStrokesStyles} />
            </Source>,
          );
        },
        (errorData) => {
          setZonesError(errorData);
          // TODO: Error handling
        },
      );
  }, [zonesError]);

  const [markersIsLoaded, setMarkersIsLoaded] = useState(false);
  const [markerError, setMarkerError] = useState(null);
  const [mapMarkersData, setMapMarkersData] = useState([]);
  const [markersToRender, setMarkersToRender] = useState([]);
  useEffect(() => {
    fetch('https://api.mevo.co.nz/public/vehicles/all')
      .then((res) => res.json())
      .then(
        (resultData) => {
          setMarkersIsLoaded(true);
          setMapMarkersData(resultData);
        },
        (errorData) => {
          setMarkersIsLoaded(true);
          // TODO: Error handling
          setMarkerError(errorData);
        },
      );
  }, []);

  useMemo(() => {
    if (markersIsLoaded && !markerError) {
      setMarkersToRender(
        mapMarkersData.map((mevoMarker) => (
          <Marker
            key={
              Number(mevoMarker.position.longitude) +
              Number(mevoMarker.position.latitude)
            }
            longitude={Number(mevoMarker.position.longitude)}
            latitude={Number(mevoMarker.position.latitude)}
          >
            <img
              src={mevoMarker.iconUrl}
              alt='Mevo car position'
              className='w-8 h-auto'
            />
          </Marker>
        )),
      );
    }
  }, [markersIsLoaded, markerError, mapMarkersData]);

  return (
    <MapGL
      {...viewport}
      width='100%'
      height='100%'
      mapStyle='mapbox://styles/mapbox/streets-v9'
      onViewportChange={setViewport}
      mapboxApiAccessToken={mapboxApiAccessToken}
    >
      {zonesToRender}
      {markersToRender}
      <NavigationControl {...mapSettings.navigationControl} />
      <GeolocateControl
        {...mapSettings.geolocateControl}
        trackUserLocation
        onViewportChange={() => setViewport({ ...viewport, zoom: 12 })}
      />
    </MapGL>
  );
}

Map.propTypes = {
  mapboxApiAccessToken: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  viewport: PropTypes.object.isRequired,
  setViewport: PropTypes.func.isRequired,
};