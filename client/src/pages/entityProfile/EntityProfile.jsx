import { useState, useEffect } from 'react';
import axios from 'axios';
// import OverflowScroll from '../../Components/OverflowScroll/OverflowScroll';
import { updateVdV, deleteVdV, addMaterial, deleteMaterial } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Avatar,
  Stack,
  HStack,
  VStack,
  Divider,
  StackDivider,
  Flex,
  Image,
} from '@chakra-ui/react';
import {
  AtSignIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  TriangleDownIcon,
} from '@chakra-ui/icons';
import { BiUser, BiUserX } from 'react-icons/bi';
import UploadImage from '../../Components/Cloudinary';
import {
  getEntityDonation,
  getEntityFeedbacks,
} from '../../redux/actions/entitiesActions';
// import { authAcountLocal } from '../../redux/actions/acountActions';
import RankingStars from '../../Components/RankingStars';

const materialsArray = [
  'Plástico',
  'Vidrio',
  'Metal',
  'Vidrio',
  'Tapitas',
  'Cartón',
  'Aceite',
  'Aluminio',
  'Madera',
  'Textiles',
  'Baterias',
  'Papel',
];

function EntityProfile() {
  //   const [saveButton, setSaveButton] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState({ lat: -39, lng: -64 });
  const [activeMarker, setActiveMarker] = useState(null);
  const [zoom, setZoom] = useState(5);

  const { acount } = useSelector((state) => state.acountReducer);
  // const id = acount.id;
  const { id } = useParams();
  const { donations, feedbacks } = useSelector(
    (state) => state.entitiesReducer
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showCBU, setShowCBU] = useState(false);
  const [input, setInput] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/vdv/${id}`).then((res) => {
      // console.log('la respuesta del axios', res.data);
      // return res.then((res) =>
      setInput({
        ...res.data,
      });
      // );
    });
    dispatch(getEntityDonation(id));
    dispatch(getEntityFeedbacks(id));
  }, [id]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleUploadImage = (url) => {
    setInput({ ...input, image: url });
  };

  const handleShow = (event) => {
    const { name } = event.target;
    name === 'password' ? setShowPassword(!showPassword) : setShowCBU(!showCBU);
  };

  const handleSaveChanges = () => {
    updateVdV(id, input);
  };

  const handleDeleteEntity = () => {
    deleteVdV(id, navigate);
  };

  const handlePlaceSelected = (e) => {
    const latitude = e.geometry.location.lat();
    const longitude = e.geometry.location.lng();
    setMapCenter({
      lat: latitude,
      lng: longitude,
    });
    setZoom(13);
    setActiveMarker(e);
    setInput((prevForm) => {
      return {
        ...prevForm,
        address: e.formatted_address,
        lat: latitude,
        lng: longitude,
      };
    });
  };

  // if (!Object.entries(acount).length) return navigate('/login');

  return (
    <Grid templateColumns={'repeat(2, 1fr)'} gap="2rem">
      <GridItem ml="2rem" mt="1rem">
        <Heading mb={'1rem'}>Información del Punto de Reciclaje</Heading>
        <Box>
          <Image
            src={input.img}
            borderRadius="full"
            boxSize="140px"
            m="5vh auto"
            mb="5vh"
          />
        </Box>
        <Box my="1rem">
          <Text>Nombre</Text>
          <InputGroup>
            <InputLeftElement children={<BiUser />} />
            <Input
              name="name"
              type="text"
              value={input.name}
              onChange={handleChange}
              //   setSaveButton={setSaveButton}
            />
          </InputGroup>
        </Box>
        <Box my="1rem">
          <Text>Mail</Text>
          <InputGroup>
            <InputLeftElement children={<AtSignIcon />} />
            <Input
              name="mail"
              type="email"
              value={input.mail}
              onChange={handleChange}
              //   setSaveButton={setSaveButton}
            />
          </InputGroup>
        </Box>
        <Box my="1rem">
          <Text>Contraseña</Text>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={input.password}
              onChange={handleChange}
              //   setSaveButton={setSaveButton}
            />
            <InputRightElement>
              <IconButton
                name="password"
                icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handleShow}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box my="1rem">
          <Text>CBU</Text>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input
              name="cbu"
              type={showCBU ? 'text' : 'password'}
              value={input.cbu}
              onChange={handleChange}
              // setSaveButton={setSaveButton}
            />
            <InputRightElement>
              <IconButton
                name="CBU"
                icon={showCBU ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handleShow}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <UploadImage onUpload={handleUploadImage} value={input.image} />
      </GridItem>

      <GridItem>
        <Box my="1rem">
          <Text>Direccion</Text>
          <InputGroup>
            <InputLeftElement children={<TriangleDownIcon />} />
            <Input
              name="address"
              type="text"
              value={input.address}
              onChange={handleChange}
              //   setSaveButton={setSaveButton}
            />
            <Box align="center">
              <Autocomplete
                onPlaceSelected={(e) => handlePlaceSelected(e)}
                style={autocompleteStyle}
                options={{
                  types: ['address'],
                  componentRestrictions: { country: 'ar' },
                }}
              />
            </Box>
          </InputGroup>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={zoom}
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
      </GridItem>

      <GridItem>
        <Box my="1rem">
          <Text>Materiales</Text>
          {input.Materials?.map((mat, i) => {
            return (
              <Button
                key={i}
                onClick={() =>
                  deleteMaterial(
                    mat.name,
                    input.Materials,
                    setInput
                    // setSaveButton
                  )
                }
              >
                {mat.name}
              </Button>
            );
          })}
          <Select
            placeholder="Agregar material"
            w="13vw"
            onChange={
              (e) => addMaterial(e, input.Materials, setInput, setSaveButton) //
            }
          >
            {materialsArray.map((mat, i) => {
              return (
                <option key={i} value={mat}>
                  {mat}
                </option>
              );
            })}
          </Select>
        </Box>
      </GridItem>

      <GridItem>
        <ButtonGroup
          variant={'outline'}
          w="full"
          justifyContent={'center'}
          mt="1rem"
        >
          <Button colorScheme={'green'} w="40%" onClick={handleSaveChanges}>
            Guardar
          </Button>
          <Button colorScheme={'blue'} w="40%">
            Cancelar
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme={'red'} w="60%" leftIcon={<BiUserX />}>
                Eliminar Punto de reciclaje
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="bold" pr={'2rem'}>
                Estas seguro de que deseas eliminar tu perfl de forma
                definitiva?
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                ⚠️ Una vez que elimines tu Perfil todos tus datos seran
                eliminados de nuestra base de datos sin posibildad de ser
                recuperados
              </PopoverBody>
              <Button colorScheme={'red'} onClick={handleDeleteEntity}>
                Confirmar
              </Button>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </GridItem>

      <GridItem mr="1rem" mb="2rem">
        <Stack mt="1rem" spacing={'1rem'}>
          <Heading mt="1rem">Donaciones</Heading>
          <Divider />
          <VStack
            alignItems="flex-start"
            maxH="25vh"
            overflowY={'scroll'}
            divider={<StackDivider />}
          >
            {donations.length !== 0 ? (
              donations.map(({ amount, date, User }, index) => (
                <Box key={index}>
                  <HStack spacing="1rem">
                    <Avatar src={User.image} name={User.name} size="sm" />
                    <Flex justifyContent="start" width="24vw">
                      <Text>{User.name}</Text>
                    </Flex>
                    <Flex justifyContent="start" width="10vw" ml="2rem">
                      <Text>{amount}</Text>
                    </Flex>
                    <Flex justifyContent="flex-start" width="9vw">
                      <Text>{date}</Text>
                    </Flex>
                  </HStack>
                </Box>
              ))
            ) : (
              <Box display="flex" h="20vh" alignItems="center">
                <Text fontSize="lg" as="b" ml="1rem">
                  {' '}
                  No se encontraron donaciones realizadas a este Punto de
                  reciclaje{' '}
                </Text>
              </Box>
            )}
          </VStack>

          <Heading>Reseñas</Heading>
          <Divider></Divider>
          <VStack
            alignItems="flex-start"
            maxH="25vh"
            overflowY={'scroll'}
            divider={<StackDivider />}
          >
            {feedbacks.length !== 0 ? (
              feedbacks.map(({ comment, rating, date, User }) => (
                <Box>
                  <HStack spacing="1rem">
                    <Avatar src={User.image} name={User.name} size="sm" />
                    <RankingStars stars={rating}></RankingStars>
                    <Flex justifyContent="start" width="22vw">
                      <Text>{comment}</Text>
                    </Flex>
                    <Flex justifyContent="flex-end" width="9vw">
                      <Text>{date}</Text>
                    </Flex>
                  </HStack>
                  <Text>{User.name}</Text>
                </Box>
              ))
            ) : (
              <Box display="flex" h="20vh" alignItems="center">
                <Text fontSize="lg" as="b" ml="1rem">
                  {' '}
                  No se encontraron reseñas realizadas a este Punto de reciclaje{' '}
                </Text>
              </Box>
            )}
          </VStack>
        </Stack>
        <Box height={'8rem'}></Box>
      </GridItem>
    </Grid>
  );
}

export default EntityProfile;

const autocompleteStyle = {
  width: '100%',
  height: '40px',
  padding: '10px',
  border: '1px solid gray',
  borderRadius: '4px',
};

const containerStyle = {
  width: '40vw',
  height: '50vh',
  position: 'absolute',
  right: '0vw',
  top: '50vh',
};

// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Flex,
//   Heading,
//   Image,
//   Select,
//   Text,
//   Card,
//   CardBody,
//   Textarea,
//   Box,
// } from '@chakra-ui/react';
// import OverflowScroll from '../../Components/OverflowScroll/OverflowScroll';
// import InfoCardInput from '../../Components/InforCardInput';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { deleteMaterial, addMaterial, updateVdV, deleteVdV } from './utils';

// const EntityProfile = () => {
//   const { id } = useParams();
//   const [saveButton, setSaveButton] = useState(false);
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const [input, setInput] = useState({
//     name: '',
//     image: '',
//     description: '',
//     address: '',
//     lat: 0,
//     lng: 0,
//     cbu: '',
//     mail: '',
//     password: '',
//     atatus: '',
//     rating: '',
//     Materials: [],
//   });

//   useEffect(() => {
//     axios.get(`http://localhost:3001/vdv/${id}`).then((res) => {
//       setInput({
//         ...res.data,
//       });
//     });
//   }, []);

//   const handleOnChange = (e) => {
//     setInput((prevObj) => {
//       return { ...prevObj, [e.target.name]: e.target.value };
//     });
//     setSaveButton(true);
//   };

//   const handleShow = (e) => setShow(!show);

//   return (
//     <Flex direction="row" justify="space-evenly" mb={'2rem'}>
//       <Flex direction="column">
//         <Heading size="lg" align="center" m="3vh">
//           Nombre
//         </Heading>
//         <InfoCardInput
//           type="name"
//           data={input.name}
//           setInput={setInput}
//           setSaveButton={setSaveButton}
//         />
//         <Heading size="lg" align="center" m="3vh">
//           Mail
//         </Heading>
//         <InfoCardInput
//           type="mail"
//           data={input.mail}
//           setInput={setInput}
//           setSaveButton={setSaveButton}
//         />
//         <Heading size="lg" align="center" m="3vh">
//           Dirección
//         </Heading>
//         <InfoCardInput
//           type="address"
//           data={input.address}
//           setInput={setInput}
//           setSaveButton={setSaveButton}
//         />
//         <Image src="https://i.blogs.es/0f9387/coche/450_1000.jpg" w="20vw" />
//       </Flex>
//       <Flex direction="column" align="center">
//         <Image
//           src={input.image}
//           borderRadius="full"
//           boxSize="140px"
//           m="5vh auto"
//           mb="5vh"
//         />
//         <Heading size="lg" align="center" m="3vh">
//           Contraseña
//         </Heading>
//         <InfoCardInput
//           type="password"
//           data={input.password}
//           setInput={setInput}
//           setSaveButton={setSaveButton}
//         />
//         <Heading size="lg" align="center" m="3vh">
//           CBU
//         </Heading>
//         <InfoCardInput
//           type="cbu"
//           data={input.cbu}
//           setInput={setInput}
//           setSaveButton={setSaveButton}
//         />
//         <Heading size="lg" align="center" m="3vh">
//           Materiales
//         </Heading>
//         {input.Materials?.map((mat, i) => {
//           return (
//             <Button
//               key={i}
//               onClick={() =>
//                 deleteMaterial(
//                   mat.name,
//                   input.Materials,
//                   setInput,
//                   setSaveButton
//                 )
//               }
//             >
//               {mat.name}
//             </Button>
//           );
//         })}
//         <Select
//           placeholder="Agregar material"
//           w="13vw"
//           onChange={(e) =>
//             addMaterial(e, input.Materials, setInput, setSaveButton)
//           }
//         >
//           {materialsArray.map((mat, i) => {
//             return (
//               <option key={i} value={mat}>
//                 {mat}
//               </option>
//             );
//           })}
//         </Select>
//       </Flex>
//       <Flex direction="column">
//         <Heading align="center" m="3vh">
//           Donaciones
//         </Heading>
//         <OverflowScroll type="entityDonation" id={id} mb="0vh" />
//         <Heading align="center" m="10vh auto" mb="5vh">
//           Descripcion
//         </Heading>
//         <Textarea
//           value={input.description}
//           name="description"
//           mb="7vh"
//           onChange={(e) => handleOnChange(e)}
//         />
//         {saveButton && (
//           <Button
//             m="10vh auto"
//             w="20vw"
//             h="10vh"
//             border="solid green 2px"
//             onClick={() => updateVdV(id, input)}
//           >
//             Guardar Cambios
//           </Button>
//         )}
//         {!saveButton && (
//           <Card w="20vw" h="7vh" m="10vh auto" pb="10vh">
//             <CardBody w="12vw" m="auto">
//               <Text m="auto">Guardar cambios</Text>
//             </CardBody>
//           </Card>
//         )}
//         <Button
//           m="auto"
//           mt="0vh"
//           w="20vw"
//           h="7vh"
//           border="solid red 2px"
//           onClick={() => deleteVdV(id, navigate)}
//         >
//           Eliminar Perfil
//         </Button>
//       </Flex>
//     </Flex>
//   );
// };

// export default EntityProfile;

// const materialsArray = [
//   'Plástico',
//   'Vidrio',
//   'Metal',
//   'Vidrio',
//   'Tapitas',
//   'Cartón',
//   'Aceite',
//   'Aluminio',
//   'Madera',
//   'Textiles',
//   'Baterias',
//   'Papel',
// ];
