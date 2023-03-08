import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
  Image,
  useColorMode,
  Flex,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  authAcountGoogle,
  authAcountLocal,
} from '../redux/actions/acountActions';
import axios from 'axios';
import ForgotPassword from './ForgotPassword';
import { fetchUsers } from '../redux/actions/usersActions';
import { fetchEntities } from '../redux/actions/entitiesActions';

const fetchUser = async (id) => {
  const res = await axios.get(`http://localhost:3001/user/${id}`);
  return res.data;
};

const validate = ({ mail, password }, users, entities) => {
  const errors = {};

  const userMails = users?.filter((element) => element.mail == mail);
  const vdvsMails = entities?.filter((element) => element.mail == mail);
  if (!mail) {
    errors.mail = 'El mail es obligatorio';
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(mail)) {
    errors.mail = 'Formato de mail invalido';
  } else if (userMails !== undefined && vdvsMails !== undefined) {
    if (userMails.length == 0 && vdvsMails.length == 0) {
      errors.mail = 'El mail ingresado no se encuentra asociado a una cuenta';
    }
  }

  if (!password) {
    errors.password = 'La contraseña es obligatoria';
  } else if (password.length < 4) {
    errors.password = 'La contraseña debe tener mínimo 4 caracteres';
  } /* else if (userMails!==undefined && vdvsMails!==undefined){
    if(userMails.length>0){
      const userData = users?.filter((user) => user.mail === mail);
      if(userData[0].password != password){
        errors.password = 'Contraseña incorrecta';
      }
    };
    if(vdvsMails.length>0){
      const vdvData = entities?.filter((vdv) => vdv.mail === mail); 
      if(vdvData[0].password != password){
        errors.password = 'Contraseña incorrecta';
      }
    };
  } */

  return errors;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { acount } = useSelector((state) => state.acountReducer);
  const { entities } = useSelector((state) => state.entitiesReducer);
  const { users } = useSelector((state) => state.usersReducer);
  const { colorMode } = useColorMode();

  const { googleId } = useParams();

  useEffect(() => {
    Object.entries(acount).length && navigate('/home');
  }, [acount]);

  useEffect(() => {
    if (googleId)
      (async () => {
        const res = await fetchUser(googleId);
        dispatch(authAcountLocal(res));
      })();
  }, [googleId]);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchEntities());
  }, [dispatch]);

  const [logInData, setLogInData] = useState({
    mail: '',
    password: '',
    keepLogged: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [logged, setLogged] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
    setErrors(validate({ ...logInData, [name]: value }, users, entities));
  };

  const handleCheck = (e) => {
    const { checked } = e.target;
    setLogged(checked);
    console.log(logged);
  };

  const handleLogin = () => {
    if (Object.keys(errors).length) {
      return toast({
        title: 'Error',
        description: 'Por favor chequea que no haya errores en ningun campo',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
    if (!Object.keys(errors).length && dispatch(authAcountLocal(logInData))) {
      return;
    } else {
      return toast({
        title: 'Error',
        description: 'Contraseña incorrecta',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      h="60rem"
      p={'6rem'}
      bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}
    >
      <Box
        height="50rem"
        w="50%"
        bg={colorMode === 'light' ? '#F5F2EB' : '#333C49'}
        margin="0 auto"
        borderRadius="1rem"
        boxShadow="dark-lg"
      >
        <Flex
          pt={'3rem'}
          flexDir={'column'}
          gap={'1rem'}
          alignItems="center"
          justifyContent={'center'}
        >
          <Image
            src="https://res.cloudinary.com/verdevolver/image/upload/v1678234115/My_project-1_1_dmqtx2.png"
            w="10rem"
            style={{ transform: 'scale(1.9)' }}
          />
          <Text
            fontWeight={'bold'}
            fontSize="6xl"
            fontFamily={'Tilt Prism'}
            marginBot="5rem"
            textColor={colorMode === 'light' ? '#b4c4ac' : '#68D391'}
          >
            VerdeVolver
          </Text>
          <FormControl isInvalid={errors.mail}>
            <InputGroup pl={'10rem'} pr="10rem" pb={'1rem'}>
              <InputLeftElement
                pl={'11rem'}
                pointerEvents="none"
                children={<AtSignIcon />}
              />
              <Input
                borderWidth={'0.1rem'}
                borderColor="black"
                type="text"
                onChange={handleChange}
                value={logInData.mail}
                name="mail"
                placeholder="Escribe tu mail"
              />
            </InputGroup>
            {errors.mail && (
              <FormErrorMessage pl={'10rem'} pr="10rem">
                {errors.mail}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <InputGroup pl={'10rem'} pr="10rem">
              <InputLeftElement
                pl={'11rem'}
                pointerEvents="none"
                children={<LockIcon />}
              />
              <Input
                borderWidth={'0.1rem'}
                borderColor="black"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                value={logInData.password}
                name="password"
                placeholder="Escribe tu contraseña"
              />
              <InputRightElement pr={'8rem'}>
                <IconButton
                  bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <FormErrorMessage pl={'10rem'} pr="10rem">
                {errors.password}
              </FormErrorMessage>
            )}
          </FormControl>

          <Checkbox name="logged" isChecked={logged} onChange={handleCheck}>
            Mantener sesión
          </Checkbox>

          <Button
            bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}
            onClick={handleLogin}
          >
            Iniciar sesión
          </Button>

          {/* <IconButton
            bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}
            icon={<AiFillGoogleCircle />}
            color="brands.google"
            onClick={() => dispatch(authAcountGoogle())}
          /> */}
          <Button
            bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}
            color={colorMode === 'light' ? 'black' : 'white'}
            rightIcon={<AiFillGoogleCircle />}
            onClick={() => dispatch(authAcountGoogle())}
          >
            Continúa con Google
          </Button>

          <Text alignSelf={'flex-end'} as="u" pr={'1rem'}>
            <ForgotPassword />
          </Text>

          <Divider />

          <Text textAlign={'center'} as="u">
            ¿Necesitas una cuenta? <Link to="/singup">Registrate acá</Link>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Login;

{
  /* <Card
bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}
w="40rem"
h="40rem"
pt="1rem"
mx={'auto'}
>
<Box
  m={'1rem'}
  display="flex"
  flexDir={'column'}
  gap={'1rem'}
  overflow={'hidden'}
>
  <FormControl isInvalid={errors.mail}>
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<AtSignIcon />} />
      <Input
        type="text"
        onChange={handleChange}
        value={logInData.mail}
        name="mail"
        placeholder="Escribe tu mail"
      />
    </InputGroup>
    {errors.mail && <FormErrorMessage>{errors.mail}</FormErrorMessage>}
  </FormControl>

  <FormControl isInvalid={errors.password}>
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<LockIcon />} />
      <Input
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        value={logInData.password}
        name="password"
        placeholder="Escribe tu contraseña"
      />
      <InputRightElement>
        <IconButton
          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
          onClick={() => setShowPassword(!showPassword)}
        />
      </InputRightElement>
    </InputGroup>
    {errors.password && (
      <FormErrorMessage>{errors.password}</FormErrorMessage>
    )}
  </FormControl>

  <Checkbox name="logged" isChecked={logged} onChange={handleCheck}>
    Mantener sesión
  </Checkbox>

  <Button onClick={handleLogin}>Iniciar sesión</Button>

  <IconButton
    icon={<AiFillGoogleCircle />}
    color="brands.google"
    onClick={() => dispatch(authAcountGoogle())}
  />

  <Text alignSelf={'flex-end'}>
    <ForgotPassword />
  </Text>

  <Divider />

  <Text textAlign={'center'}>
    ¿Necesitas una cuenta? <Link to="/singup">Registrate</Link>
  </Text>
</Box>
</Card>
);
}; */
}
