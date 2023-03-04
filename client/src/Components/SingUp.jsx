import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  FormLabel,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { BiUser, BiDirections, BiImage } from 'react-icons/bi';
import axios from 'axios';
import {
  authAcountLocal,
  authAcountGoogle,
} from '../redux/actions/acountActions';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../Components/Cloudinary';

const validate = ({ name, last_name, mail, password, address, image }) => {
  const errors = {};

  if (!name) {
    errors.name = 'El nombre es obligatorio';
  } else if (name.length < 3 || name.length > 16) {
    errors.name = 'El nombre debe tener entre 3 y 16 caracteres';
  }

  if (!last_name) {
    errors.last_name = 'El apellido es obligatorio';
  } else if (last_name.length < 4 || last_name.length > 16) {
    errors.last_name = 'El apellido debe tener entre 4 y 16 caracteres';
  }

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

  if (!address) {
    errors.address = 'La dirección es obligatoria';
  } else if (address.length < 8 || address.length > 32) {
    errors.address = 'La dirección debe tener entre 8 y 32 caracteres';
  }

  if (
    !image.startsWith('https://') ||
    (!image.endsWith('.jpg') && !image.endsWith('.png'))
  ) {
    errors.image = 'Formato de imagen invalido';
  }

  return errors;
};

const SingUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { acount } = useSelector((state) => state.acountReducer);

  useEffect(() => {
    Object.entries(acount).length && navigate('/home');
  }, [acount]);

  const [singUpData, setSingUpData] = useState({
    name: '',
    last_name: '',
    mail: '',
    password: '',
    address: '',
    image: '',
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingUpData({ ...singUpData, [name]: value });
    setErrors(validate({ ...singUpData, [name]: value }));
  };

  const handleSubmit = async () => {
    const errors = validate(singUpData);
    setErrors(errors);

    if (!Object.keys(errors).length) {
      const res = await axios.post('http://localhost:3001/user', {
        ...singUpData,
        role: 1,
      });
      res.status === 200 && dispatch(authAcountLocal(singUpData));
    }
  };

  const handleUploadImage = (url) => {
    setSingUpData({ ...singUpData, image: url });
  };

  return (
    <Box
      m={'1rem'}
      display="flex"
      flexDir={'column'}
      gap={'1rem'}
      overflow={'hidden'}
    >
      <FormControl isInvalid={errors.name}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<BiUser />} />

          <Input
            type="text"
            onChange={handleChange}
            value={singUpData.name}
            name="name"
            placeholder="Escribe tu nombre"
          />
        </InputGroup>
        {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={errors.last_name}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<BiUser />} />

          <Input
            type="text"
            onChange={handleChange}
            value={singUpData.last_name}
            name="last_name"
            placeholder="Escribe tu apellido"
          />
        </InputGroup>
        {errors.last_name && (
          <FormErrorMessage>{errors.last_name}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errors.mail}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<AtSignIcon />} />
          <Input
            type="text"
            onChange={handleChange}
            value={singUpData.mail}
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
            value={singUpData.password}
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

      <FormControl isInvalid={errors.address}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<BiDirections />} />
          <Input
            type="text"
            onChange={handleChange}
            value={singUpData.address}
            name="address"
            placeholder="Escribe tu dirreción"
          />
        </InputGroup>
        {errors.address && (
          <FormErrorMessage>{errors.address}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.image}>
        <FormLabel>Imagen</FormLabel>
        <UploadImage onUpload={handleUploadImage} value={singUpData.image} />
        {errors.image ? (
          <FormHelperText>Sube tu imagen aqui.</FormHelperText>
        ) : (
          <FormErrorMessage>{errors.image}</FormErrorMessage>
        )}
      </FormControl>

      <Button onClick={handleSubmit}>Registrarse</Button>

      <IconButton
        icon={<AiFillGoogleCircle />}
        color="brands.google"
        onClick={() => dispatch(authAcountGoogle())}
      />

      <Divider />

      <Text textAlign={'center'}>
        Ya estas registrado? <Link to="/login">Inicia sesión</Link>
      </Text>
    </Box>
  );
};

export default SingUp;
