import React from 'react';
import { Box } from '@chakra-ui/react';
import AsideMap from '../Components/AsideMap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MainMapComponent from '../Components/MainMapComponent';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDrsME92YLQUVHQ7gIROn5_Sx9xQZEcwS0">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
