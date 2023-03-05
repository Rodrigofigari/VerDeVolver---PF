import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  InputGroup,
  Select,
  Stack,
  Box,
  InputLeftElement,
  HStack,
  Heading,
  Grid,
  useToast,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import PostsCarousel from '../Components/PostsCarousel';
import axios from 'axios';

const Home = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { entities } = useSelector((state) => state.entitiesReducer);
  const { acount } = useSelector((state) => state.acountReducer);
  const [donation, setDonation] = useState({ amount: '', entity: '' });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setDonation({ ...donation, [name]: value });
  };

  const handleDonate = () => {
    const { id } = acount;
    const { amount, entity } = donation;

    if (!id) {
      navigate('/login');
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para poder donar',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
      throw error('Debes iniciar sesión para poder donar');
    }

    if (amount && entity) {
      try {
        axios
          .post('http://localhost:3001/donation', {
            VdVId: entity,
            amount: amount,
            UserId: id,
          })
          .then((res) => (window.location.href = res.data.body.init_point));
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      toast({
        title: 'Warning',
        description: 'Debes seleccionar una entidad e ingresar un monto',
        status: 'warning',
        duration: 1500,
        isClosable: true,
      });
    }
  };
  const { colorMode } = useColorMode();

  return (
    <Box
      align="center"
      bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}
      padding="1rem"
    >
      <Box
        justify="center"
        align="center"
        mb="0.8rem"
        p="0.7rem"
        bg={colorMode === 'light' ? '#F5F2EB' : '#2c835b'}
      >
        <Text
          bg={colorMode === 'light' ? '#2c835b' : '#212933'}
          h="7rem"
          color="white"
          padding="0.8rem"
          borderRadius="md"
          textAlign={'center'}
          align="center"
          width="50vw"
          m="0.7rem"
          fontSize="xl"
          fontFamily="lato"
        >
          Te brindamos información sobre los distintos lugares dedicados al
          reciclaje en todo el país. Encontrá los más cercanos y hacé que tu
          experiencia de gestión de residuos sea mucho más fácil. ¡Gracias por
          cuidar el planeta junto a nosotrxs!
        </Text>
        <Stack p={'4'}>
          <HStack>
            <Select
              placeholder="Colabora con el punto de reciclaje que te haya ayudado.."
              onChange={handleInputs}
              name="entity"
              borderWidth="0.2rem"
              borderColor="gray.300"
            >
              {entities?.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Select>
            <InputGroup>
              <InputLeftElement children={<MdOutlineAttachMoney />} />
              <Input
                borderWidth="0.2rem"
                borderColor="gray.300"
                name="amount"
                placeholder="Monto"
                type="number"
                onChange={handleInputs}
              />
            </InputGroup>
          </HStack>
          <Grid placeItems="center">
            <Button
              //bg={colorMode === 'light' ? '#2c835b' : '#212933'}
              color="vdv.main"
              colorScheme="green"
              width="30%"
              onClick={handleDonate}
              mt="0.3rem"
            >
              Donar
            </Button>
          </Grid>
        </Stack>

        <PostsCarousel />
      </Box>
    </Box>
  );
};

export default Home;
