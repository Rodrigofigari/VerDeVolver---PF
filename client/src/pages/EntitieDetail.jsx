import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
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
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import RankingStars from '../Components/RankingStars';
import {
  getEntityById,
  getEntityFeedbacks,
} from '../redux/actions/entitiesActions';
import CreateRating from '../Components/CreateRating';

const EntityDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getEntityById(id));
    dispatch(getEntityFeedbacks(id));
  }, [id]);

  const { entity, feedbacks } = useSelector((state) => state.entitiesReducer);
  const { acount } = useSelector((state) => state.acountReducer);

  //borra dp
  console.log('estadoFeedbacks', feedbacks);
  //

  if (!entity || !feedbacks) return <PropagateLoader color="#1c5738" />;

  const navigate = useNavigate();
  const [inputMonto, setInputMonto] = useState('');
  const [inputReview, setInputReview] = useState('');
  const [stars, setStars] = useState(0);

  const handleInputs = (event) => {
    event.target.name === 'Monto'
      ? setInputMonto(event.target.value)
      : setInputReview(event.target.value);
  };

  const handleDonate = () => {
    const userId = acount.id;
    if (inputMonto) {
      if (!userId) {
        navigate('/login');
        toast({
          title: 'Error',
          description: 'Debes iniciar sesión para poder donar',
          status: 'error',
          duration: 1500,
          isClosable: true,
        });
      }
      try {
        axios
          .post('http://localhost:3001/donation', {
            VdVId: id,
            amount: inputMonto,
            UserId: userId,
          })
          .then((res) => (window.location.href = res.data.body.init_point));
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      toast({
        title: 'Warning',
        description: 'Debes ingresar un monto',
        status: 'warning',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const handleComment = async (event) => {
    const userId = acount.id;
    if (!userId) {
      navigate('/login');
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para poder dejar tu reseña',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
    if (!inputReview) {
      toast({
        title: 'Error',
        description: 'Debes elegir una puntuación y escribir un comentario',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
    if (inputReview && userId) {
      try {
        await axios.post('http://localhost:3001/feedback/create', {
          comment: inputReview,
          rating: stars,
          UserId: userId,
          VdVId: id,
        });
        location.reload();
        toast({
          title: 'Éxito',
          description: 'Creación de reseña exitosa',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
      } catch (error) {
        throw Error(error.message);
      }
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={'1rem'}>
      <GridItem>
        <VStack ml="1rem">
          <Image src={entity.img} maxHeight="35%" maxWidth="50%" />
          <InputGroup>
            <InputLeftElement children={<MdOutlineAttachMoney />} />
            <Input
              name="Monto"
              placeholder="Monto"
              type={'number'}
              onChange={handleInputs}
            />
            <Button onClick={handleDonate}>Donar</Button>
          </InputGroup>
        </VStack>
      </GridItem>
      <GridItem>
        <Heading>{entity.name}</Heading>
        <HStack my="1rem">
          {entity.Materials?.map(({ name }, i) => (
            <Badge key={i} variant="solid" colorScheme="green">
              {name}
            </Badge>
          ))}
        </HStack>
        <Text fontSize={'lg'} lineHeight="8">
          {entity.description}
        </Text>

        <Stack mt="1rem" spacing={'1rem'}>
          <Heading fontSize={'lg'}>Reseñas</Heading>
          <Divider />
          <VStack
            alignItems="flex-start"
            overflowY={'scroll'}
            maxH="25vh"
            divider={<StackDivider />}
          >
            {feedbacks?.map(({ User, comment, rating }) => (
              <Box key={User + comment}>
                <HStack spacing="1rem">
                  {User.image == null ? (
                    <Avatar name={User.name} size="sm" />
                  ) : (
                    <Avatar src={User.image} size="sm" />
                  )}

                  <Text>{User.name}</Text>
                  <RankingStars stars={rating} />
                </HStack>
                <Text>{comment}</Text>
              </Box>
            ))}
          </VStack>
          <Divider />

          <Box>
            <Box>
              <CreateRating stars={stars} setStars={setStars} />
            </Box>
            <VStack>
              <Textarea
                name="Review"
                placeholder="Deja tu reseña"
                type={'text'}
                onChange={handleInputs}
              />
              <Button onClick={handleComment} w="full">
                Comentar
              </Button>
            </VStack>
          </Box>
          <Box height={'5rem'}></Box>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default EntityDetail;
