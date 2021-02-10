/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react';

import { FlyToInterpolator, Marker, Source, Layer } from 'react-map-gl';
import { nearestPoint, point, featureCollection } from '@turf/turf';
import mapSettings from './utils/mapSettings';
import Map from './components/Map';
import Navbar from './components/Navbar';
import Container from './components/Container';

function App() {
  const [viewport, setViewport] = useState({ ...mapSettings.mapInitialState });

  const backToWelly = useCallback(() => {
    setViewport({
      ...viewport,
      longitude: 174.790984,
      latitude: -41.292757,
      zoom: 12,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
      transitionDuration: 'auto',
    });
  }, [viewport]);

  const [zonesToRender, setZonesToRender] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [zonesError, setZonesError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [markerError, setMarkerError] = useState(null);
  const [fetchedMarkersData, setFetchedMarkersData] = useState([]);
  const [markersToRender, setMarkersToRender] = useState([]);
  const [userPosition, setUserPosition] = useState([]);
  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    const fetchData = () => {
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
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://api.mevo.co.nz/public/vehicles/all')
        .then((res) => res.json())
        .then(
          (resultData) => {
            setFetchedMarkersData(resultData);
            setMarkersToRender(
              resultData.map((mevoMarker) => (
                <Marker
                  key={
                    mevoMarker.position.longitude + mevoMarker.position.latitude
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
          },
          (errorData) => {
            // TODO: Error handling
            setMarkerError(errorData);
          },
        );
    };
    fetchData();
  }, []);

  const findNearestCar = () => {
    const mevoMarkersPositions = [];
    fetchedMarkersData.map((el) =>
      mevoMarkersPositions.push(
        point([Number(el.position.longitude), Number(el.position.latitude)]),
      ),
    );
    const nearestMevoCarObj = nearestPoint(
      point(userPosition),
      featureCollection(mevoMarkersPositions),
    );
    const nearestMarker = fetchedMarkersData.find(
      (el) =>
        el.position.longitude == nearestMevoCarObj.geometry.coordinates[0] &&
        el.position.latitude == nearestMevoCarObj.geometry.coordinates[1],
    );
    if (nearestMarker) {
      setMarkersToRender([
        <Marker
          key={
            nearestMarker.position.longitude + nearestMarker.position.latitude
          }
          longitude={Number(nearestMarker.position.longitude)}
          latitude={Number(nearestMarker.position.latitude)}
        >
          <img
            src={nearestMarker.iconUrl}
            alt='Mevo car position'
            className='w-10 h-auto'
          />
        </Marker>,
      ]);
    }
  };
  // const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${userPosition};${nearestMevoCarObj.geometry.coordinates}?access_token=${mapSettings.accessToken}`;
  // fetch(url)
  //   .then((res) => res.json())
  //   .then(
  //     (resultData) => {
  //       console.log(resultData);
  //     },
  //     (errorData) => {
  //       // TODO: Error handling
  //       console.log(errorData);
  //     },
  //   );

  return (
    <div className='App'>
      <Container>
        <Navbar
          locationEnabled={locationEnabled}
          backToWelly={backToWelly}
          findNearestCar={findNearestCar}
        />
        <Map
          viewport={viewport}
          setViewport={setViewport}
          userPosition={userPosition}
          setUserPosition={setUserPosition}
          setLocationEnabled={setLocationEnabled}
          zonesToRender={zonesToRender}
          markersToRender={markersToRender}
        />
      </Container>
    </div>
  );
}

export default App;
