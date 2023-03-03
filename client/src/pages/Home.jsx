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

  return (
    <Box justify="center" align="center" mt='1rem'>
      <Heading
        as="h1"
        size="l"
        bg="#2F855A"
        w="70%"
        h="6.2rem"
        color="white"
        padding="1.5%"
        borderRadius="md"
        fontFamily="sans-serif"
        textAlign={'center'}
      >
        Te brindamos información sobre los distintos lugares dedicados al
        reciclaje en todo el país. Encontrá los más cercanos y hacé que tu
        experiencia de gestión de residuos sea mucho más fácil. ¡Gracias por
        cuidar el planeta junto a nosotrxs!
      </Heading>
      <Stack p={'4'}>
        <HStack>
          <Select
            placeholder="Colabora con el punto de reciclaje que te haya ayudado.."
            onChange={handleInputs}
            name="entity"
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
              name="amount"
              placeholder="Monto"
              type="number"
              onChange={handleInputs}
            />
          </InputGroup>
        </HStack>
        <Grid placeItems="center">
          <Button
            color="vdv.main"
            colorScheme="green"
            width="full"
            onClick={handleDonate}
          >
            Donar
          </Button>
        </Grid>
      </Stack>

      <PostsCarousel />
    </Box>
  );
};

export default Home;
