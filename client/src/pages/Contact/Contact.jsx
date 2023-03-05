import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import validate from './utils';
import { createNewContact } from '../../redux/actions/usersActions';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Box,
  Flex,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { LogedUser } from '../../redux/actions/acountActions';

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    mail: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    name: { isError: false, errorMsg: '' },
    mail: { isError: false, errorMsg: '' },
    description: { isError: false, errorMsg: '' },
  });

  const [msg, setMsg] = useState('');
  const [descMsg, setdescMsg] = useState('');

  const handlerBlur = (ev) => {
    const errOjb = validate(form, ev.target.name);
    setErrors({ ...errors, [ev.target.name]: errOjb });
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: { isError: false, errorMsg: '' } });

    if (name === 'description') {
      setdescMsg(value.length);
    }
    setForm({ ...form, [name]: value });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    let errorsObj = {};
    Object.keys(form).forEach((name) => {
      const errOjb = { [name]: validate(form, name) };
      errorsObj = { ...errorsObj, ...errOjb };
    });
    setErrors({ ...errors, ...errorsObj });
    const isError = Object.keys(errors).find(
      (error) => errorsObj[error].isError
    );
    if (isError) {
      return;
    }
    dispatch(createNewContact(form));
    navigate('/home');
  };

  return (
    <Box mr="10%" ml="10%" mt="5%">
      <VStack as="form" spacing={4}>
        <Box fontWeight={'700'} fontSize="1.4em">
          <h1>Contáctate con nosotros!</h1>
        </Box>
        <Flex w="100%" justifyContent="space-between">
          <FormControl
            isRequired
            isInvalid={errors.name.isError}
            pb={'2%'}
            mr={'5%'}
            border={'4px'}
            borderRadius={'6px'}
            borderColor="green"
            pr={'5%'}
            pl={'5%'}
          >
            <FormLabel textAlign={'center'}>Nombre</FormLabel>
            <Input
              _focus={{
                boxShadow: 'none',
              }}
              borderBottom={'2px'}
              border={'none'}
              textAlign={'center'}
              name="name"
              onChange={handlerChange}
              onBlur={handlerBlur}
              type="text"
              value={form.name}
            />
            {!errors.name.isError && form.name.length === 0 ? (
              <FormHelperText textAlign={'center'}>
                Ingresá tu nombre
              </FormHelperText>
            ) : (
              <FormErrorMessage textAlign={'center'}>
                {errors.name.errorMsg}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errors.mail.isError}
            ml={'5%'}
            border={'4px'}
            borderRadius={'6px'}
            borderColor="green"
            pr={'5%'}
            pl={'5%'}
          >
            <FormLabel textAlign={'center'}>Correo electrónico:</FormLabel>
            <Input
              _focus={{
                boxShadow: 'none',
              }}
              borderBottom={'2px'}
              border={'none'}
              _hover={{ color: 'brand.green' }}
              textAlign={'center'}
              name="mail"
              onChange={handlerChange}
              onBlur={handlerBlur}
              type="email"
              value={form.mail}
            />
            {!errors.mail.isError && form.mail.length === 0 ? (
              <FormHelperText textAlign={'center'}>
                Ingresá tu email
              </FormHelperText>
            ) : (
              <FormErrorMessage textAlign={'center'}>
                {errors.mail.errorMsg}
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <FormControl
          isRequired
          isInvalid={errors.description.isError}
          pb={'2%'}
          pr={'5%'}
          pl={'5%'}
          border={'4px'}
          borderRadius={'6px'}
          borderColor="green"
          id="descripcion"
        >
          <FormLabel textAlign={'center'}>Descripción:</FormLabel>
          <Textarea
            _focus={{
              boxShadow: 'none',
            }}
            borderBottom={'1px'}
            border={'none'}
            _hover={{ color: 'brand.green' }}
            textAlign={'center'}
            onChange={handlerChange}
            onBlur={handlerBlur}
            name="description"
            value={form.description}
          />
          {form.description.length !== 0 && !errors.description.isError ? (
            <FormHelperText textAlign={'center'}>
              Por favor ingresa como mínimo 20 caracteres, vas {descMsg}
            </FormHelperText>
          ) : (
            ''
          )}
          {!errors.description.isError && form.description.length === 0 ? (
            <FormHelperText textAlign={'center'}>
              Dejanos tu consulta!
            </FormHelperText>
          ) : (
            <FormErrorMessage textAlign={'center'}>
              {errors.description.errorMsg}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          colorScheme="green"
          size="sm"
          type="submit"
          onClick={handlerSubmit}
        >
          Enviar
        </Button>
        <Box height={'22rem'}></Box>
      </VStack>
    </Box>
  );
};

export default Contact;
