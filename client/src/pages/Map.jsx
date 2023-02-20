import React from 'react';
import { Box } from '@chakra-ui/react';
import AsideMap from '../Components/AsideMap';

const Map = () => {
  return (
    <Box position={'relative'}>
      <AsideMap />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26094667.532478303!2d-81.59910103261723!3d-37.024484255268334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5e11880c8e3%3A0x9149d5783c6f328e!2sGreenpeace%20Argentina!5e0!3m2!1ses-419!2sar!4v1676662899816!5m2!1ses-419!2sar"
        style={{ border: '0', width: '100%', height: '90vh' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
  );
};

export default Map;
