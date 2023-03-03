import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Heading,
  Image,
  Select,
  Text,
  Card,
  CardBody,
  Textarea,
} from '@chakra-ui/react';
import OverflowScroll from '../../Components/OverflowScroll/OverflowScroll';
import InfoCardInput from '../../Components/InforCardInput';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteMaterial, addMaterial, updateVdV, deleteVdV } from './utils';

const EntityProfile = () => {
  const { id } = useParams();
  const [saveButton, setSaveButton] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    mail: '',
    password: '',
    cbu: '',
    Materials: [],
    address: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/vdv/${id}`).then((res) => {
      setInput({
        ...res.data,
        image:
          'https://www.anahuac.mx/mexico/sites/default/files/styles/webp/public/noticias/El-plastico-reciclado-eficiente-como-material-de-construccion.jpg.webp?itok=rEmpK8uY',
      });
    });
  }, []);

  const handleOnChange = (e) => {
    setInput((prevObj) => {
      return { ...prevObj, [e.target.name]: e.target.value };
    });
    setSaveButton(true);
  };

  return (
    <Flex direction="row" justify="space-evenly">
      <Flex direction="column">
        <Heading size="lg" align="center" m="3vh">
          Nombre
        </Heading>
        <InfoCardInput
          type="name"
          data={input.name}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
        <Heading size="lg" align="center" m="3vh">
          Mail
        </Heading>
        <InfoCardInput
          type="mail"
          data={input.mail}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
        <Heading size="lg" align="center" m="3vh">
          Dirección
        </Heading>
        <InfoCardInput
          type="address"
          data={input.address}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
        <Image src="https://i.blogs.es/0f9387/coche/450_1000.jpg" w="20vw" />
      </Flex>
      <Flex direction="column" align="center">
        <Image
          src={input.image}
          borderRadius="full"
          boxSize="140px"
          m="5vh auto"
          mb="5vh"
        />
        <Heading size="lg" align="center" m="3vh">
          Contraseña
        </Heading>
        <InfoCardInput
          type="password"
          data={input.password}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
        <Heading size="lg" align="center" m="3vh">
          CBU
        </Heading>
        <InfoCardInput
          type="cbu"
          data={input.cbu}
          setInput={setInput}
          setSaveButton={setSaveButton}
        />
        <Heading size="lg" align="center" m="3vh">
          Materiales
        </Heading>
        {input.Materials?.map((mat, i) => {
          return (
            <Button
              key={i}
              onClick={() =>
                deleteMaterial(
                  mat.name,
                  input.Materials,
                  setInput,
                  setSaveButton
                )
              }
            >
              {mat.name}
            </Button>
          );
        })}
        <Select
          placeholder="Agregar material"
          w="13vw"
          onChange={(e) =>
            addMaterial(e, input.Materials, setInput, setSaveButton)
          }
        >
          {materialsArray.map((mat, i) => {
            return (
              <option key={i} value={mat}>
                {mat}
              </option>
            );
          })}
        </Select>
      </Flex>
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Donaciones
        </Heading>
        <OverflowScroll type="entityDonation" id={id} mb="0vh" />
        <Heading align="center" m="10vh auto" mb="5vh">
          Descripcion
        </Heading>
        <Textarea
          value={input.description}
          name="description"
          mb="7vh"
          onChange={(e) => handleOnChange(e)}
        />
        {saveButton && (
          <Button
            m="10vh auto"
            w="20vw"
            h="10vh"
            border="solid green 2px"
            onClick={() => updateVdV(id, input)}
          >
            Guardar Cambios
          </Button>
        )}
        {!saveButton && (
          <Card w="20vw" h="7vh" m="10vh auto" pb="10vh">
            <CardBody w="12vw" m="auto">
              <Text m="auto">Guardar cambios</Text>
            </CardBody>
          </Card>
        )}
        <Button
          m="auto"
          mt="0vh"
          w="20vw"
          h="7vh"
          border="solid red 2px"
          onClick={() => deleteVdV(id, navigate)}
        >
          Eliminar Perfil
        </Button>
      </Flex>
    </Flex>
  );
};

export default EntityProfile;

const materialsArray = [
  'Plástico',
  'Vidrio',
  'Metal',
  'Vidrio',
  'Tapitas',
  'Cartón',
  'Aceite',
  'Aluminio',
  'Madera',
  'Textiles',
  'Baterias',
  'Papel',
];
