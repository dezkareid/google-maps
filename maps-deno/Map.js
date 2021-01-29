export function loadAPI(apiKey) {
  return new Promise((resolve, reject) => {
    const mapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = mapURL;
    script.defer = true;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
export function loadMap(mapConfig) {
  const { apiKey, mapSelector, ...mapOptions } = mapConfig;
  loadAPI(apiKey)
    .then(() => renderMap(mapSelector, mapOptions))
}

export function renderMap(mapSelector, mapOptions) {
  const element = document.querySelector(mapSelector);
  return new google.maps.Map(element, mapOptions);
}