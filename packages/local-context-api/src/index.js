import mapStyles from './mapStyles';
import './index.scss';

const placeTypePreferences = [
  'restaurant'
];

function getMapElement() {
  return document.querySelector('.app__map');
}

function cleanView() {
  const element = getMapElement();
  element.innerHTML = 'Loading';
}

function createLocalContextMapView(localContextMapViewOptions = {}, mapOptions = {}) {
  const defaultLocalContextMapViewOptions = {
    element: getMapElement(),
    placeTypePreferences,
    maxPlaceCount: 0,
  };

  const mergedLocalContextMapViewOptions = {
    ...defaultLocalContextMapViewOptions,
    ...localContextMapViewOptions
  };
  const localContextMapView = new google.maps.localContext.LocalContextMapView(mergedLocalContextMapViewOptions);

  const defaultMapOptions = {
    center: { lat: 18.1553086, lng: -95.1845618 },
    zoom: 16,
    styles: mapStyles
  };

  const mergeMapOptions = {
    ...defaultMapOptions,
    ...mapOptions
  };

  localContextMapView.map.setOptions(mergeMapOptions);
  localContextMapView.maxPlaceCount = 12;
  localContextMapView.directionsOptions = {
    origin: mergeMapOptions.center
  };
  localContextMapView.search();
  return localContextMapView;
}
function localContextMapViewClousure() {
  let localContextMapView = null;
  function localContextMapViewCreator() {
    if (!localContextMapView) {
      localContextMapView = createLocalContextMapView();
    }
    return localContextMapView;
  }
  function localContextMapViewUpdater(localContextMapViewOptions = {}, mapOptions = {}) {
    localContextMapView = createLocalContextMapView(localContextMapViewOptions, mapOptions);
    return localContextMapView;
  }

  return [localContextMapViewCreator, localContextMapViewUpdater];
}

function markerClosure() {
  let marker = null;
  return function createMarker(config) {
    if (!marker) {
      marker = new google.maps.Marker(config);
    } else {
      if (config.map) {

      }
      marker.setOptions(config)
    }
    return marker;
  }
}

const [getLocalContextMapView, updateLocalContextMapView] = localContextMapViewClousure();

const updateMarker = markerClosure();

function getOnChangePlace(autocomplete) {
  return function onChangePlace() {
    const place = autocomplete.getPlace();
    const { geometry } = place;
    if (geometry) {
      const { location } = geometry;
      cleanView();
      const localContextMapView = updateLocalContextMapView({}, { center: location });
      const { map } = localContextMapView;
      updateMarker({ map, position: location });
    } else {
      alert('Place missing')
    }
  }
}

function initAutoComplete() {
  const input = document.querySelector('.search__input');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', getOnChangePlace(autocomplete));
}

function initLocalContextMapView() {
  window.localContextMapView = getLocalContextMapView();
}

function initMarker() {
  const localContextMapView = getLocalContextMapView();
  const { map } = localContextMapView;
  const position = map.getCenter();
  updateMarker({ map, position });
}

function init () {
  initLocalContextMapView();
  initAutoComplete();
  initMarker();
}

window.addEventListener('load', init);