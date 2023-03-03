import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import MarkerInfo from '../Components/MarkerInfo';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEntities, getMaterials } from '../redux/actions/entitiesActions';
import Autocomplete from 'react-google-autocomplete';
import AsideMap from '../Components/AsideMap';

const containerStyle = {
  width: '99vw',
  height: '100vh',
};

const Map = () => {
  const dispatch = useDispatch();

  const [activeMarker, setActiveMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: -39, lng: -64 });
  const [zoom, setZoom] = useState(5);
  const { entities, filteredEntities } = useSelector(
    (state) => state.entitiesReducer
  );

  //const { colorMode } = useColorMode();
  useEffect(() => {
    dispatch(fetchEntities());
    dispatch(getMaterials());
    filters = entities;
  }, []);

  let filters = filteredEntities;

  const handleMarkerMouseOver = (marker) => {
    setActiveMarker({ ...marker });
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  const userUbication = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setZoom(13);
      });
    }
  };

  return (
    <Box pos="relative">
      <AsideMap filters={filters} />
      <Button
        onClick={() => userUbication()}
        pos="absolute"
        left="1vw"
        top="20vh"
        zIndex="1"
      >
        Ir a mi ubicación
      </Button>
      <Box align="center">
        <Autocomplete
          onPlaceSelected={(e) => {
            setMapCenter({
              lat: e.geometry.location.lat(),
              lng: e.geometry.location.lng(),
            });
            setZoom(13);
          }}
          style={autocompleteStyle}
          options={{
            types: ['address'],
            componentRestrictions: { country: 'ar' },
          }}
        />
      </Box>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
      >
        {filters?.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onMouseOver={() => handleMarkerMouseOver(marker)}
          />
        ))}

        {activeMarker && (
          <InfoWindow
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <MarkerInfo data={activeMarker} />
          </InfoWindow>
        )}
      </GoogleMap>
      <Box height={'2rem'}></Box>
    </Box>
  );
};

export default Map;

const autocompleteStyle = {
  width: '100%',
  height: '40px',
  padding: '10px',
  border: '1px solid gray',
  borderRadius: '4px',
  fontSize: '20px',
};
