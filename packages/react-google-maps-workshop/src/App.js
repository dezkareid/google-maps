/* eslint-disable no-undef */
import React from 'react';
import style from './App.module.css';
import DMap from './DMap';
import DMarker from './DMarker'
function App() {
  const zoom = 8;
  const center = {
    lat: -25.344,
    lng: 131.036
  };
  return (
    <main className={style['App']}>
      <DMap className={style['App__Map']} center={center} zoom={zoom}>
        <DMarker position={center}/>
      </DMap>
    </main>
  );
}

export default App;
