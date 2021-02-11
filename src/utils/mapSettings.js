const mapSettings = {
  accessToken:
    'pk.eyJ1IjoibWl0cmk0NSIsImEiOiJja2tqMjJ3djYwcXdpMnZxa3QydWVsYWh6In0.bS8T8wGM8SJCmouWHcJ1fA',
  mapInitialState: {
    latitude: -41.292757,
    longitude: 174.790984,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  },
  geolocateControl: {
    style: {
      top: 80,
      right: 10,
      margin: 15,
    },
    showAccuracyCircle: false,
    positionOptions: {
      enableHighAccuracy: true,
    },
    fitBoundsOptions: { maxZoom: 15 },
  },
  navigationControl: {
    showCompass: false,
    style: {
      top: 0,
      right: 10,
      margin: 15,
    },
  },
  layer: {
    zonesFadeInStyle: {
      id: 'mevoZonesFadeIn',
      source: 'geoDataSource',
      type: 'fill',
      paint: {
        'fill-color': '#5B5F61',
        'fill-outline-color': '#f7590d',
        'fill-opacity': 0.3,
      },
    },
    zonesStrokesStyles: {
      id: 'mevoZonesStrokes',
      source: 'geoDataSource',
      type: 'line',
      paint: {
        'line-color': '#f7590d',
        'line-width': 3,
      },
    },
  },
};

export default mapSettings;
