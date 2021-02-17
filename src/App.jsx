/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from 'react';

import { FlyToInterpolator, Marker, Source, Layer } from 'react-map-gl';
import { nearestPoint, point, featureCollection } from '@turf/turf';
import * as polyline from '@mapbox/polyline';
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
  const [directionToTheCar, SetDirectionToTheCar] = useState([]);

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
                  offsetTop={-44}
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
      setMarkersToRender(
        <Marker
          longitude={Number(nearestMarker.position.longitude)}
          latitude={Number(nearestMarker.position.latitude)}
          offsetTop={-44}
        >
          <img
            src={nearestMarker.iconUrl}
            alt='Nearest Mevo car position'
            className='animate-car-found w-10 h-auto '
          />
        </Marker>,
      );
      const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${userPosition};${nearestMevoCarObj.geometry.coordinates}?access_token=${mapSettings.accessToken}`;
      fetch(url)
        .then((res) => res.json())
        .then(
          (resultData) => {
            const convertToGeoJson = polyline.toGeoJSON(
              resultData.routes[0].geometry,
            );
            SetDirectionToTheCar(
              <Source type='geojson' data={convertToGeoJson} id='directionJson'>
                <Layer {...mapSettings.layer.directionsStyles} />
              </Source>,
            );
            const first = convertToGeoJson.coordinates[0];
            const last =
              convertToGeoJson.coordinates[
                convertToGeoJson.coordinates.length - 1
              ];
            console.log(convertToGeoJson);
            console.log(first);
            console.log(last);

            // prettier-ignore
            // const { longitude, latitude } = new WebMercatorViewport(viewport).fitBounds([first, last]);
            // console.log(longitude, latitude);
            // setViewport({
            //   ...viewport,
            //   viewState: {
            //     longitude,
            //     latitude,
            //     transitionInterpolator: new FlyToInterpolator(),
            //     transitionDuration: 'auto',
            //   },
            // });
          },
          (errorData) => {
            // TODO: Error handling
            console.log(errorData);
          },
        );
    }
  };

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
          directionToTheCar={directionToTheCar}
        />
      </Container>
    </div>
  );
}

export default App;
