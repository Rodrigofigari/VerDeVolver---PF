import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

function MainMapComponent() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: -30, lng: -150 }}
    ></GoogleMap>
  );
}

export default MainMapComponent;
