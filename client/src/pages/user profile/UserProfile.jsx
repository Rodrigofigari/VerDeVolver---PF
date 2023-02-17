import React, { useState } from 'react';
import { Button, Flex, Heading, Image } from '@chakra-ui/react';
import OverflowScroll from '../../Components/OverflowScroll';
import InfoCardInput from '../../Components/InforCardInput';

function UserProfile() {
  const [input, setInput] = useState({
    name: 'Rodrigo Jorge Figari',
    image:
      'http://2.bp.blogspot.com/_pmMRm3e0SI0/TERW8TI2SfI/AAAAAAAAB60/vEtccLWaB6g/s280/princeencantador.jpg',
    mail: 'rodrifigari@gmail.com',
    password: 'ceowncowencwo',
  });
  return (
    <Flex direction="row">
      <Flex direction="column">
        <Heading size="lg" align="center" m="3vh">
          Nombre
        </Heading>
        <InfoCardInput name={input.name} setInput={setInput} />
        <Heading size="lg" align="center" m="3vh">
          Mail
        </Heading>
        <InfoCardInput mail={input.mail} setInput={setInput} />
        <Button mt="10vh">Guardar Cambios</Button>
      </Flex>
      <Flex direction="column" align="center">
        <Image src={input.image} borderRadius="full" boxSize="140px" />
        <Heading size="lg" align="center" m="3vh">
          Contraseña
        </Heading>
        <InfoCardInput password={input.password} setInput={setInput} />
        <Button mt="10vh">Eliminar Perfil</Button>
      </Flex>
      <Flex direction="column">
        <Heading align="center" m="3vh">
          Donaciones
        </Heading>
        <OverflowScroll type="donation" />
        <Heading align="center" m="3vh">
          Servicios
        </Heading>
        <OverflowScroll type="services" />
      </Flex>
    </Flex>
  );
}

export default UserProfile;
