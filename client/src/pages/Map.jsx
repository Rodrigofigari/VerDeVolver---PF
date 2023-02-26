import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import MarkerInfo from '../Components/MarkerInfo';

const containerStyle = {
  width: '99vw',
  height: '100vh',
};

const center = {
  lat: -39,
  lng: -64,
};

const markersData = [
  {
    id: 1,
    position: { lat: -34, lng: -64 },
    name: 'Economía Circular',
    description:
      'Entidad privada cuya actividad se centra en mejorar la calidad de vida de las personas optimizando el aprovechamiento de recursos.',
    imageUrl:
      'https://i.pinimg.com/564x/0e/60/c7/0e60c7fcd2d898873fc7d1a5060cc232.jpg',
    materials: ['Plástico', 'Vidrio', 'Cartón'],
  },
  {
    id: 2,
    position: { lat: -35, lng: -65 },
    name: 'Amigos de la Tierra',
    description:
      'Somos una asociación ecologista que fomenta el cambio local y global hacia una sociedad respetuosa con el medio ambiente, justa y solidaria.',
    imageUrl:
      'https://i.pinimg.com/564x/4e/db/10/4edb108418125c6085492f82349de7b2.jpg',
    materials: ['Vidrio', 'Papel', 'Pilas'],
  },
];

const Map = () => {
  const [activeMarker, setActiveMarker] = React.useState(null);

  const handleMarkerMouseOver = (marker) => {
    setActiveMarker({ ...marker });
  };

  const handleMarkerMouseOut = () => {
    setTimeout(() => setActiveMarker(null), 1500);
  };

  return (
    <Box>
      <LoadScript googleMapsApiKey="AIzaSyDrsME92YLQUVHQ7gIROn5_Sx9xQZEcwS0">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
          {markersData.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              onMouseOver={() => handleMarkerMouseOver(marker)}
              onMouseOut={handleMarkerMouseOut}
            />
          ))}

          {activeMarker && (
            <InfoWindow position={activeMarker.position}>
              <MarkerInfo data={activeMarker} />
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default Map;
