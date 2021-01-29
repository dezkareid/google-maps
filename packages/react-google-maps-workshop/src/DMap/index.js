/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';

function DMap({ center, className = '', children, zoom  }) {
  const [map, setMap] = useState(null);
  const mapRef = useRef();
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}`;
    mapScript.async = true;
    document.body.appendChild(mapScript);
    mapScript.addEventListener('load', () => {
      const mapOptions = { center, zoom };
      const mapInstance = new google.maps.Map(mapRef.current, mapOptions);
      setMap(mapInstance);
    })
  }, []);
  const mapElements = React.Children.map(children, child => {
    return React.cloneElement(child, { map });
  });
  return <div ref={mapRef} className={className}>{mapElements}</div>
}

export default DMap;