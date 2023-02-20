import { useParams } from 'react-router-dom';
import PropagateLoader from 'react-spinners/PropagateLoader';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import RankingStars from '../Components/RankingStars';
import axios from 'axios';

const EntityDetail = () => {
  const { id } = useParams();
  const [input, setInput] = useState(false);
  const [feedBacks, setFeedBacks] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/vdv/${id}`).then((res) => {
      setInput({
        ...res.data,
        image:
          'https://media.lacapital.com.ar/p/c2a33864011f924c825debbc800fdc33/adjuntos/204/imagenes/028/327/0028327548/1200x675/smart/leo-mattiolijpg.jpg',
      });
    });
    axios.get(`http://localhost:3001/feedback/vdv/${id}`).then((res) => {
      setFeedBacks(res.data);
    });
  }, [id]);

  if (!input) return <PropagateLoader color="#1c5738" />;
  if (!feedBacks) return <PropagateLoader color="#1c5738" />;

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={'1rem'}>
      <GridItem>
        <Image src={input.image} />
        <InputGroup>
          <InputLeftElement children={<MdOutlineAttachMoney />} />
          <Input placeholder="Monto" type={'number'} />
          <Button>Donar</Button>
        </InputGroup>
      </GridItem>
      <GridItem>
        <Heading>{input.name}</Heading>
        <HStack my="1rem">
          {input.Materials.map((m, i) => (
            <Badge key={i} variant="solid" colorScheme="green">
              {m.name}
            </Badge>
          ))}
        </HStack>
        <Text fontSize={'lg'} lineHeight="8">
          {input.description}
        </Text>

        <Stack mt="1rem">
          <Heading fontSize={'lg'}>Reseñas</Heading>
          <Divider />
          <VStack
            alignItems="flex-start"
            overflowY={'scroll'}
            maxH="25vh"
            divider={<StackDivider />}
          >
            {feedBacks?.map(({ User, rating, comment }, i) => (
              <Box key={i}>
                <HStack>
                  <Avatar name={User.name} size="sm" />
                  <RankingStars stars={rating} />
                </HStack>
                <Text>{comment}</Text>
              </Box>
            ))}
          </VStack>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default EntityDetail;
