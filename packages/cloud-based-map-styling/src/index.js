import './index.scss';

function mapClousure () {
  let map = null;
  return function () {
    if (!map) {
      const center = { lat: 18.1553086, lng: -95.1845618 };
      const zoom = 13;
      const mapId = GOOGLE_MAP_ID;
      const domElement = document.querySelector('.app__map');
      map = new google.maps.Map(
        domElement,
        {
          zoom,
          center,
          mapId
        },
      );
    }
    return map;
  }
}

const getMap = mapClousure();

function init () {
  getMap();
}

window.addEventListener('load', init);
