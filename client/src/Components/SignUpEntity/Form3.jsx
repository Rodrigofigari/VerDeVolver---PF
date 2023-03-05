import {
  Box,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  ButtonGroup,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react';
import Autocomplete from 'react-google-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';
import validate from './utils';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fillEntityForm,
  createNewEntity,
} from '../../redux/actions/entitiesActions';
import { useNavigate } from 'react-router-dom';
const Form3 = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { entityForm } = useSelector((state) => state.entitiesReducer);

  const [mapCenter, setMapCenter] = useState({ lat: -39, lng: -64 });
  const [activeMarker, setActiveMarker] = useState(null);
  const [zoom, setZoom] = useState(5);
  const [form, setForm] = useState({
    address: '',
    lat: '',
    lng: '',
  });

  const [errors, setErrors] = useState({
    address: { isError: false, errorMsg: '' },
  });

  const handlePlaceSelected = (e) => {
    const latitude = e.geometry.location.lat();
    const longitude = e.geometry.location.lng();
    setMapCenter({
      lat: latitude,
      lng: longitude,
    });
    setZoom(13);
    setActiveMarker(e);
    setForm((prevForm) => {
      return {
        ...prevForm,
        address: e.formatted_address,
        lat: latitude,
        lng: longitude,
      };
    });
    dispatch(
      fillEntityForm({
        ...form,
        address: e.formatted_address,
        lat: latitude,
        lng: longitude,
      })
    );
  };
  const handleSubmit = () => {
    let errorsObj = {};
    Object.keys(form).forEach((name) => {
      const errOjb = { [name]: validate(form, name) };
      errorsObj = { ...errorsObj, ...errOjb };
    });
    setErrors({ ...errors, ...errorsObj });

    const isError = Object.keys(errors).find(
      (error) => errorsObj[error].isError
    );

    if (isError) {
      return toast({
        title: 'Error',
        description: 'Por favor chequea que no haya errores en ningun campo',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
    dispatch(fillEntityForm(form));
    dispatch(createNewEntity(entityForm));
    toast({
      title: 'Formulario creado correctamente.',
      description:
        'Muchas gracias por completar tus datos! Nos pondremos en contacto vía email.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    navigate('/home');
  };
  const handleBackClick = () => {
    dispatch(
      fillEntityForm({
        address: '',
        lat: '',
        lng: '',
      })
    );
    setProgressAndStep({ step: 2, progress: -33.3 });
  };
  const handlerBlur = () => {
    const errOjb = validate(form, 'address');
    setErrors({ ...errors, ['address']: errOjb });
  };
  return (
    <Stack direction="column" spacing="24px">
      <Box>
        <GoogleMap
          center={mapCenter}
          zoom={zoom}
          mapContainerStyle={containerStyle}
        >
          {activeMarker && (
            <Marker
              position={{
                lat: activeMarker.geometry.location.lat(),
                lng: activeMarker.geometry.location.lng(),
              }}
            />
          )}
        </GoogleMap>
      </Box>
      <FormControl isRequired isInvalid={errors.address.isError}>
        <FormLabel>Dirección</FormLabel>
        <Box align="center">
          <Autocomplete
            onPlaceSelected={(e) => handlePlaceSelected(e)}
            style={autocompleteStyle}
            options={{
              types: ['address'],
              componentRestrictions: { country: 'ar' },
            }}
            onBlur={handlerBlur}
          />
        </Box>
        {!errors.address.isError && form.address.length === 0 ? (
          <FormHelperText>Indica la dirección.</FormHelperText>
        ) : (
          <FormErrorMessage>{errors.address.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Button
            onClick={handleBackClick}
            colorScheme="green"
            variant="solid"
            w="7rem"
            mr="5%"
          >
            Anterior
          </Button>
          <Button
            w="7rem"
            onClick={handleSubmit}
            colorScheme="green"
            variant="outline"
          >
            Enviar
          </Button>
        </Flex>
      </ButtonGroup>
    </Stack>
  );
};
export default Form3;

const autocompleteStyle = {
  width: '100%',
  height: '40px',
  padding: '10px',
  border: '1px solid gray',
  borderRadius: '4px',
};

const containerStyle = {
  margin: '0 auto',
  borderRadius: '10px',
  marginTop: '1rem',
  maxWidth: '40vw',
  height: '50vh',
};
