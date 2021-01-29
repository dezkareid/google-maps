import './index.scss';

function mapClousure () {
  let map = null;
  return function getMap () {
    if (!map) {
      const center = { lat: 18.1553086, lng: -95.1845618 };
      const zoom = 13;
      const domElement = document.querySelector('.app__map');
      map = new google.maps.Map(
        domElement,
        {zoom, center }
      );
    }
    return map;
  }
}

function markerClosure () {
  let marker = null;
  return function moveMarker (config) {
    if (!marker) {
      marker = new google.maps.Marker(config);
    } else {
      marker.setPosition(config.position)
    }
    return marker;
  }
}

function getOnChangePlace(autocomplete) {
  return function () {
    const place = autocomplete.getPlace();
    const { geometry } = place;
    if (geometry) {
      const map = getMap();
      const { location } = geometry;
      moveMarker({ map, position: location });
      map.panTo(location);
    } else {
      alert('Place missing')
    }
  }
}

function initAutoComplete() {
  const submitButton = document.querySelector('.search__button');
  submitButton.setAttribute('hidden', true);
  const input = document.querySelector('.search__input');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', getOnChangePlace(autocomplete));
}

const useAutocomplete = false;

const getMap = mapClousure();

const moveMarker = markerClosure();

function init () {
  initMap();
  if (useAutocomplete) {
    initAutoComplete()
  } else {
    initForm();
  }
}

function initForm () {
  const domElement = document.querySelector('form');
  domElement.addEventListener('submit', onSubmit);
}

function onSubmit (event) {
  event.preventDefault();
  event.stopPropagation();
  const domElement = document.querySelector('.search__input');
  const plusCode = domElement.value;
  if (plusCode) {
    const codeArea = OpenLocationCode.decode(plusCode);
    const position = { lat: codeArea.latitudeCenter, lng: codeArea.longitudeCenter };
    const map = getMap();
    moveMarker({ map, position });
    map.panTo(position);
  }
}

function initMap() {
  const map = getMap();
  map.addListener('click', onClickMap);
}

function onClickMap (event) {
  const { latLng } = event;
  const map = getMap();
  moveMarker({ map, position: event.latLng });
  const coordinates = { latitude: latLng.lat(), longitude: latLng.lng() };
  const plusCode = getPlusCode(coordinates);
  writePlusCode(plusCode);
  map.panTo(event.latLng);
}

function getPlusCode(coordinates) {
  const { latitude, longitude } = coordinates;
  return OpenLocationCode.encode(latitude, longitude);
}

function writePlusCode (plusCode) {
  const domElement = document.querySelector('.plus-code');
  domElement.textContent = `Plus code: ${plusCode}`;
}



window.addEventListener('load', init);