import { GOOGLE_MAPS_KEY } from "./keys.js";
import { loadMap } from './Map.js';

function init () {
  const apiKey = GOOGLE_MAPS_KEY;
  const mapSelector = '#map';
  const zoom = 13;
  const center = { lat: 18.1553086, lng: -95.1845618 };
  const mapConfig = {
    apiKey,
    center,
    mapSelector,
    zoom
  };
  loadMap(mapConfig) 
}

window.addEventListener("load", init);