import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  Button,
  ButtonGroup,
  Flex,
} from '@chakra-ui/react';
import UploadImage from '../../Components/Cloudinary';
import validate from './utils';
import { fetchEntities } from '../../redux/actions/entitiesActions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fillEntityForm } from '../../redux/actions/entitiesActions';

const Form2 = ({ setProgressAndStep }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntities());
  }, [dispatch]);

  const { entities } = useSelector((state) => state.entitiesReducer);

  const [form, setForm] = useState({
    description: '',
    img: '',
    cbu: undefined,
  });
  const [errors, setErrors] = useState({
    description: { isError: false, errorMsg: '' },
    img: { isError: false, errorMsg: '' },
    cbu: { isError: false, errorMsg: '' },
  });

  const [msg, setMsg] = useState('');
  const [descMsg, setdescMsg] = useState('');

  const handleUploadImage = (url) => {
    setForm({ ...form, img: url });
  };

  const handlerBlur = (ev) => {
    const errOjb = validate(form, ev.target.name, [], entities);
    setErrors({ ...errors, [ev.target.name]: errOjb });
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: { isError: false, errorMsg: '' } });

    if (name === 'cbu') {
      if (form.cbu !== undefined) {
        setMsg(value.length);
        if (name === 'cbu' && value.length === 22) {
          return;
        }
      }
    }

    if (name === 'description') {
      setdescMsg(value.length);
    }

    setForm({ ...form, [name]: value });
  };

  const handleNextClick = () => {
    let errorsObj = {};
    Object.keys(form).forEach((name) => {
      const errOjb = { [name]: validate(form, name, [], entities) };
      errorsObj = { ...errorsObj, ...errOjb };
    });
    setErrors({ ...errors, ...errorsObj });

    const isError = Object.keys(errors).find(
      (error) => errorsObj[error].isError
    );

    if (isError) {
      return;
    }
    dispatch(fillEntityForm(form));
    setProgressAndStep({ step: 3, progress: 33.3 });
  };
  const handleBackClick = () => {
    dispatch(
      fillEntityForm({
        description: '',
        img: '',
        cbu: undefined,
      })
    );
    setProgressAndStep({ step: 1, progress: -33.3 });
  };
  return (
    <>
      <FormControl isRequired isInvalid={errors.description.isError}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          onChange={handlerChange}
          onBlur={handlerBlur}
          name="description"
          placeholder="Ingresa una descripción..."
          value={form.description}
        />
        {form.description.length !== 0 && !errors.description.isError ? (
          <FormHelperText>Caracteres {descMsg} de 70 hasta 450</FormHelperText>
        ) : (
          ''
        )}
        {!errors.description.isError && form.description.length === 0 ? (
          <FormHelperText>
            Contanos brevemente sobre tu proyecto.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.description.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <br />
      <FormControl isRequired isInvalid={errors.img.isError}>
        <FormLabel>Imagen</FormLabel>
        <UploadImage
          onUpload={handleUploadImage}
          onChange={handlerChange}
          onBlur={handlerBlur}
        />
        {!errors.img.isError && form.img.length === 0 ? (
          <FormHelperText>Sube tu imagen aqui.</FormHelperText>
        ) : (
          <FormErrorMessage>{errors.img.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <br />
      <FormControl isInvalid={errors.cbu.isError}>
        <FormLabel>CBU</FormLabel>
        <Input
          name="cbu"
          onChange={handlerChange}
          onBlur={handlerBlur}
          type="number"
          value={form.cbu}
        />
        {form.cbu !== undefined && !errors.cbu.isError ? (
          <FormHelperText>Debes ingresar 22 números y vas {msg}</FormHelperText>
        ) : (
          ''
        )}
        {!errors.cbu.isError && form.cbu === undefined ? (
          <FormHelperText>
            Puedes ingresar tu CBU para recibir donaciones.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.cbu.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Button
            onClick={handleBackClick}
            colorScheme="green"
            variant="solid"
            w="7rem"
            mr="5%"
          >
            Anterior
          </Button>
          <Button
            w="7rem"
            onClick={handleNextClick}
            colorScheme="green"
            variant="outline"
          >
            Siguiente
          </Button>
        </Flex>
      </ButtonGroup>
    </>
  );
};
export default Form2;
