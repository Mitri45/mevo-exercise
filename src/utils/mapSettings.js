const mapSettings = {
  geolocateControl: {
    style: {
      top: 80,
      right: 0,
      margin: 15,
    },
    showAccuracyCircle: false,
    positionOptions: {
      enableHighAccuracy: true,
    },
    fitBoundsOptions: { maxZoom: 25 },
  },
  navigationControl: {
    showCompass: false,
    style: {
      top: 0,
      right: 0,
      margin: 15,
    },
  },
  layer: {
    zonesFadeInStyle: {
      id: 'mevoZonesFadeIn',
      source: 'geoDataSource',
      type: 'fill',
      paint: {
        'fill-color': '#678191',
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
