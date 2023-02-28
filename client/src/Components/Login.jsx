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
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAcountLocal } from '../redux/actions/acountActions';
import axios from 'axios';

const fetchUser = async (id) => {
  const res = await axios.get(`http://localhost:3001/user/${id}`);
  return res.data;
};

const validate = ({ mail, password }) => {
  const errors = {};

  if (!mail) {
    errors.mail = 'El mail es obligatorio';
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(mail)) {
    errors.mail = 'Formato de mail invalido';
  }

  if (!password) {
    errors.password = 'La contraseña es obligatoria';
  } else if (password.length < 4 || password.length > 16) {
    errors.password = 'La contraseña debe tener entre 4 y 16 caracteres';
  }

  return errors;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { acount } = useSelector((state) => state.acountReducer);
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

  const [logInData, setLogInData] = useState({
    mail: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
    setErrors(validate({ ...logInData, [name]: value }));
  };

  const handleLogin = () => {
    !Object.keys(errors).length && dispatch(authAcountLocal(logInData));
  };

  return (
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
            type={show ? 'text' : 'password'}
            onChange={handleChange}
            value={logInData.password}
            name="password"
            placeholder="Escribe tu contraseña"
          />
          <InputRightElement>
            <IconButton
              icon={show ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShow(!show)}
            />
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        )}
      </FormControl>

      <Checkbox>Mantener sesión</Checkbox>

      <Button onClick={handleLogin}>Iniciar sesión</Button>

      <a href="http://localhost:3001/login/google">Iniciar sesión con google</a>

      <Text alignSelf={'flex-end'}>
        <Link>Olvidaste tu contraseña?</Link>
      </Text>

      <Divider />

      <Text textAlign={'center'}>
        Necesitas una cuenta? <Link to="/singup">Registrate</Link>
      </Text>
    </Box>
  );
};

export default Login;
