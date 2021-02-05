/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useMemo } from 'react';
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Source,
  Layer,
} from 'react-map-gl';
import Navbar from './components/Navbar';
import Container from './components/Container';
import mapSettings from './utils/mapSettings';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibWl0cmk0NSIsImEiOiJja2tqMjJ3djYwcXdpMnZxa3QydWVsYWh6In0.bS8T8wGM8SJCmouWHcJ1fA';

function App() {
  const [viewport, setViewport] = useState({
    latitude: -41.292757,
    longitude: 174.790984,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });
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
    <div className='App'>
      <Container>
        <Navbar />
        <ReactMapGL
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          bearing={viewport.bearing}
          pitch={viewport.pitch}
          minZoom={12}
          width='100%'
          height='100%'
          mapStyle='mapbox://styles/mapbox/streets-v9'
          onViewportChange={setViewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {zonesToRender}
          {markersToRender}
          <NavigationControl {...mapSettings.navigationControl} />
          <GeolocateControl
            {...mapSettings.geolocateControl}
            trackUserLocation
          />
        </ReactMapGL>
      </Container>
    </div>
  );
}

export default App;
