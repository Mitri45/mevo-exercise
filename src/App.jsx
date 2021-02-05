import React, { useState, useCallback } from 'react';

import { FlyToInterpolator } from 'react-map-gl';
import Map from './components/Map';
import Navbar from './components/Navbar';
import Container from './components/Container';

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

  const backToWelly = useCallback(() => {
    setViewport({
      ...viewport,
      longitude: 174.790984,
      latitude: -41.292757,
      zoom: 12,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
      transitionDuration: 'auto',
    });
  }, []);
  return (
    <div className='App'>
      <Container>
        <Navbar clickHandler={backToWelly} />
        <Map
          mapboxApiAccessToken={MAPBOX_TOKEN}
          viewport={viewport}
          setViewport={setViewport}
        />
      </Container>
    </div>
  );
}

export default App;
