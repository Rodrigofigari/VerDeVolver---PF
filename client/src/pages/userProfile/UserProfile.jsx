import { useState, useEffect } from 'react';
import OverflowScroll from '../../Components/OverflowScroll/OverflowScroll';
import { deleteUser, updateUser } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { BiUser, BiUserX } from 'react-icons/bi';
import UploadImage from '../../Components/Cloudinary';
import {getUserDonations, getUserFeedbacks} from '../../redux/actions/usersActions';
import { authAcountLocal } from '../../redux/actions/acountActions';
import RankingStars from '../../Components/RankingStars';

function UserProfile() {
  const dispatch = useDispatch();

  const { acount } = useSelector((state) => state.acountReducer);
  const { donations, feedbacks } = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();


  const userId = acount.id;
  useEffect(() => {
    dispatch(getUserDonations(userId));
    dispatch(getUserFeedbacks(userId));
  }, [userId]);

  const [input, setInput] = useState({
    name: acount?.name,
    mail: acount?.mail,
    password: acount?.password,
    image: acount?.image,
  });
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleShow = (e) => setShow(!show);

  const handleSaveChanges = () => {
    updateUser(acount?.id, input);
    dispatch(authAcountLocal(acount));
  };

  const handleCancelChanges = () => {
    setInput({
      name: acount?.name,
      mail: acount?.mail,
      password: acount?.password,
      image: acount?.image,
    });
  };

  const handleDeleteUser = () => {
    deleteUser(acount?.id, navigate, dispatch);
  };

  const handleUploadImage = (url) => {
    setInput({ ...input, image: url });
  };

  if (!Object.entries(acount).length) return navigate('/login');

  return (
    <Grid templateColumns={'repeat(2, 1fr)'} gap="2rem">
      <GridItem ml='2rem' mt='1rem'>
        <Heading mb={'1rem'}>Información del usuario</Heading>
        <Box my="1rem">
          <Text>Nombre</Text>
          <InputGroup >
            <InputLeftElement children={<BiUser />} />
            <Input 
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          </InputGroup>
        </Box>
        <Box my="1rem">
          <Text>Mail</Text>
          <InputGroup>
            <InputLeftElement children={<AtSignIcon />} />
            <Input
              type="email"
              name="mail"
              value={input.mail}
              onChange={handleChange}
            />
          </InputGroup>
        </Box>
        <Box my="1rem">
          <Text>Contraseña</Text>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input
              type={show ? 'text' : 'password'}
              name="password"
              value={input.password}
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton
                icon={show ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handleShow}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <UploadImage onUpload={handleUploadImage} value={input.image} />

        <ButtonGroup
          variant={'outline'}
          w="full"
          justifyContent={'center'}
          mt="1rem"
        >
          <Button colorScheme={'green'} w="40%" onClick={handleSaveChanges}>
            Guardar
          </Button>
          <Button colorScheme={'blue'} w="40%" onClick={handleCancelChanges}>
            Cancelar
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme={'red'} w="40%" leftIcon={<BiUserX />}>
                Eliminar usuario
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="bold" pr={'2rem'}>
                Estas seguro de que deseas eliminar tu usuario de forma
                definitiva?
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                ⚠️ Una vez que elimines tu usuario todos tus datos seran
                eliminados de nuestra base de datos sin posibildad de ser
                recuperados
              </PopoverBody>
              <Button colorScheme={'red'} onClick={handleDeleteUser}>
                Confirmar
              </Button>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </GridItem>

      <GridItem mr='1rem' mb='2rem'>
        <Stack mt="1rem" spacing={'1rem'}>

        <Heading mt='1rem'>Donaciones</Heading>
        <Divider />
        <VStack
            alignItems="flex-start"
            maxH="25vh"
            overflowY={'scroll'}
            divider={<StackDivider />}
          >
        {donations.length !== 0 ? donations.map(({ amount, date, VdV }) => (
          <Box >
            <HStack spacing='1rem' >
              <Avatar src={VdV.img} name={VdV.name} size="sm" />
              <Flex justifyContent='start' width='24vw' >
                <Text>{VdV.name}</Text>
              </Flex>
              <Flex justifyContent='start' width='10vw' ml='2rem'>
                <Text>{amount}</Text>
              </Flex>
              <Flex justifyContent='flex-start' width='9vw'>
                <Text>{date}</Text>
              </Flex>
            </HStack>
          </Box>
        )): <Box display='flex' h='20vh' alignItems='center' > 
              <Text 
                fontSize='lg' as='b' ml='1rem' 
              > No se encontraron donaciones pertenecientes a este usuario </Text>
            </Box> }
        </VStack>

        <Heading>Reseñas</Heading>
        <Divider></Divider>
        <VStack
            alignItems="flex-start"
            maxH="25vh"
            overflowY={'scroll'}
            divider={<StackDivider />}
          >
        {feedbacks.length !== 0 ? feedbacks.map(({ comment, rating, date, VdV }) => (
          <Box >
            <HStack spacing='1rem' >
              <Avatar src={VdV.img} name={VdV.name} size="sm" />
              <RankingStars stars={rating} ></RankingStars>
              <Flex justifyContent='start' width='22vw' >
                <Text>{comment}</Text>
              </Flex>
              <Flex justifyContent='flex-end' width='9vw'>
                <Text>{date}</Text>
              </Flex>
            </HStack>
            <Text>{VdV.name}</Text>
          </Box>
        )): <Box display='flex' h='20vh' alignItems='center' > 
              <Text 
                fontSize='lg' as='b' ml='1rem' 
              > No se encontraron reseñas pertenecientes a este usuario </Text>
            </Box> }
          </VStack>
        </Stack>
      </GridItem>
    </Grid>
  );
}

export default UserProfile;
