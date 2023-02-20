import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

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
import PostsCarousel from '../Components/PostsCarousel';
import { MdOutlineAttachMoney } from 'react-icons/md';

const Home = () => {
  const { entities } = useSelector((state) => state.entitiesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntities());
  }, [dispatch]);

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
            <InputLeftElement children={<MdOutlineAttachMoney />} />
            <Input placeholder="Monto" type="number" />
          </InputGroup>
        </HStack>
        <Button color={'vdv.main'} colorScheme="green">
          Donar
        </Button>
      </Stack>

      <PostsCarousel />
    </Box>
  );
};

export default Home;
