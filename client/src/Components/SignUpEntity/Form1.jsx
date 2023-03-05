import {
  Button,
  Heading,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  FormHelperText,
  ButtonGroup,
} from '@chakra-ui/react';
import {
  getMaterials,
  fillEntityForm,
} from '../../redux/actions/entitiesActions';
import validate from './utils';
import { fetchUsers } from '../../redux/actions/usersActions';
import { fetchEntities } from '../../redux/actions/entitiesActions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Form1 = ({ setProgressAndStep }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    mail: '',
    materials: [],
  });
  const deleteMaterial = (mat) => {
    const newMaterials = form.materials.filter((eachMat) => eachMat !== mat);
    setForm({ ...form, materials: newMaterials });
    dispatch(fillEntityForm({ ...form, materials: newMaterials }));
  };
  const addMaterial = (e) => {
    let newMaterials = [...form.materials];

    newMaterials.push(e.target.value);
    const uniqueMaterials = [...new Set([...newMaterials])];
    setForm({ ...form, materials: uniqueMaterials });
  };
  useEffect(() => {
    dispatch(getMaterials());
    dispatch(fetchUsers());
    dispatch(fetchEntities());
  }, [dispatch]);

  const materials = useSelector((state) => {
    return state.entitiesReducer.materials;
  });

  const { entities } = useSelector((state) => state.entitiesReducer);
  const { users } = useSelector((state) => state.usersReducer);

  const [errors, setErrors] = useState({
    name: { isError: false, errorMsg: '' },
    mail: { isError: false, errorMsg: '' },
    materials: { isError: false, errorMsg: '' },
  });

  const handlerBlur = (ev) => {
    const errOjb = validate(form, ev.target.name, users, entities);
    setErrors({ ...errors, [ev.target.name]: errOjb });
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: { isError: false, errorMsg: '' } });
    setForm({ ...form, [name]: value });
  };
  const handleNextClick = () => {
    let errorsObj = {};
    Object.keys(form).forEach((name) => {
      const errOjb = { [name]: validate(form, name, users, entities) };
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
    setProgressAndStep({ step: 2, progress: 33.3 });
  };
  const handleBackClick = () => {
    setProgressAndStep({ step: 1, progress: -33.3 });
  };
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Participá con tu proyecto en nuestro mapa!
      </Heading>
      <Flex>
        <FormControl mr="5%" isRequired isInvalid={errors.name.isError}>
          <FormLabel>Nombre</FormLabel>
          <Input
            name="name"
            onChange={handlerChange}
            onBlur={handlerBlur}
            type="text"
            value={form.name}
          />
          {!errors.name.isError && form.name.length === 0 ? (
            <FormHelperText>Ingresa el nombre de tu proyecto.</FormHelperText>
          ) : (
            <FormErrorMessage>{errors.name.errorMsg}</FormErrorMessage>
          )}
        </FormControl>
        <br />
        <FormControl isRequired isInvalid={errors.mail.isError}>
          <FormLabel>Email</FormLabel>
          <Input
            name="mail"
            onChange={handlerChange}
            onBlur={handlerBlur}
            type="email"
            value={form.mail}
          />
          {!errors.mail.isError && form.mail.length === 0 ? (
            <FormHelperText>Ingresa el email.</FormHelperText>
          ) : (
            <FormErrorMessage>{errors.mail.errorMsg}</FormErrorMessage>
          )}
        </FormControl>
      </Flex>
      <br />
      <FormControl isRequired isInvalid={errors.materials.isError}>
        <FormLabel>Materiales Reciclables</FormLabel>
        <Select
          placeholder="Elegir material"
          w="18vw"
          name="materials"
          onChange={(e) => addMaterial(e)}
          onBlur={handlerBlur}
        >
          {materials?.map((mat, i) => {
            return (
              <option key={i} value={mat.id}>
                {mat.name}
              </option>
            );
          })}
        </Select>
        <br />
        {form.materials.map((mat, i) => {
          return (
            <Button key={i} onClick={() => deleteMaterial(mat)}>
              {
                materials.find((material) => {
                  return material.id == mat;
                })?.name
              }
            </Button>
          );
        })}

        {!errors.materials.isError && form.materials.length === 0 ? (
          <FormHelperText>
            Selecciona únicamente los materiales que recibirás.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.materials.errorMsg}</FormErrorMessage>
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
            isDisabled={true}
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
export default Form1;
