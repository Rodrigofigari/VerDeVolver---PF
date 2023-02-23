import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchEntities } from '../redux/actions/entitiesActions';
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
} from '@chakra-ui/react';
// import PostsCarousel from '../components/PostsCarousel';
import { MdOutlineAttachMoney } from 'react-icons/md';

const Home = () => {
  const { entities } = useSelector((state) => state.entitiesReducer);

  // const [inputVdv, setInputVdV] = useState();
  // const [inputMonto, setInputMonto] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntities());
  }, [dispatch]);

  // const handleInputs = (event) => {
  //   const { name, value } = event.target;
  //   name === 'Monto' ? setInputMonto(value) : setInputVdV(value);
  // };

  // const handleButton = (event) => {
  //   if (inputMonto && inputVdv) {
  //     alert(`Gracias por donar ${inputMonto} a ${inputVdv}`);
  //   } else {
  //     alert('Seleccione entidad o monto faltante');
  //   }
  // };

  return (
    <Box justify="center" align="center">
      <Heading
        as="h1"
        size="l"
        bg="#2F855A"
        w="70%"
        h="100px"
        color="white"
        padding="2%"
        borderRadius="md"
      >
        Te brindamos información sobre los distintos lugares dedicados al
        reciclaje en todo el país. Encontrá los más cercanos y hacé que tu
        experiencia de gestión de residuos sea mucho más fácil. ¡Gracias por
        cuidar el planeta junto a nosotrxs!
      </Heading>
      <Stack p={'4'}>
        <HStack>
          <Select placeholder="Colabora con el punto de reciclaje que te haya ayudado..">
            {entities?.map(({ id, name }) => (
              <option key={id}>{name}</option>
            ))}
          </Select>
          <InputGroup>
            <InputLeftElement
              children={<MdOutlineAttachMoney />}
              // onChange={handleInputs}
            />
            <Input
              name="Monto"
              placeholder="Monto"
              type="number"
              // onChange={handleInputs}
            />
          </InputGroup>
        </HStack>
        <Button
          color={'vdv.main'}
          colorScheme="green" /*onClick={handleButton}*/
        >
          Donar
        </Button>
      </Stack>

      {/* <PostsCarousel
        posts={[
          {
            url: 'https://www.instagram.com/p/CKTr02XgZMh/?utm_source=ig_web_copy_link',
          },
          {
            url: 'https://www.instagram.com/p/CIT3Hz2jDqh/?utm_source=ig_web_copy_link',
          },
          {
            url: 'https://www.instagram.com/p/CIBswgBs1Ps/?utm_source=ig_web_copy_link',
          },
          {
            url: 'https://www.instagram.com/p/CHpyNNYDUKq/?utm_source=ig_web_copy_link',
          },
        ]}
      /> */}
    </Box>
  );
};

export default Home;
