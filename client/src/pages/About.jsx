import React from 'react';
import {
  Text,
  Flex,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Link,
  Image,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';

const About = () => {
  const { colorMode } = useColorMode();
  function renderDevCard(devName, devImg, devLinkd, devIg, devMail) {
    return (
      <Card
        bg={colorMode === 'light' ? '#F5F2EB' : '#2c835b'}
        border="solid 3px"
        borderColor={colorMode === 'light' ? 'black' : '#2c835b'}
        fontFamily="lato"
        w="20%"
        m="1vh"
        h="45vh"
        p="0.5rem"
      >
        <Image
          src={devImg}
          alt="Dev Photo"
          borderRadius="full"
          boxSize="100px"
          m="auto"
        />
        <CardHeader m="1px" p="1px" align="center">
          <Heading size="md">{devName}</Heading>
        </CardHeader>

        <CardBody mt="1px">
          <Stack divider={<StackDivider />} spacing="1">
            <Link href={devIg} isExternal m="auto">
              Instagram <ExternalLinkIcon mx="2px" />
            </Link>
            <Link href={devLinkd} isExternal m="auto">
              LinkedIn <ExternalLinkIcon mx="2px" />
            </Link>
            <Text pt="2" fontSize="md" m="auto">
              {devMail} <CopyIcon mx="2px" />
            </Text>
          </Stack>
        </CardBody>
      </Card>
    );
  }

  const devList = [
    {
      name: 'Solana Rocio Gomez',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730208/sol_qut1t5.jpg',
    },
    {
      name: 'Milton Jeremias Amelino',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730247/tato_sa9zqk.jpg',
    },
    {
      name: 'Diana Atobe',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730798/dini_vcji6w.png',
      linkedin: 'https://www.linkedin.com/in/diana-atobe/',
      ig: 'https://www.instagram.com/dianaatobe/',
      mail: 'dianatobe@gmail.com',
    },
    {
      name: 'Juan Cruz Toloy',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730200/juan_c7r7qq.jpg',
    },
    {
      name: 'Cristian Mauricio Ortiz',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730219/cris_zwqoxn.jpg',
    },
    {
      name: 'Rodrigo Jorge Figari',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730168/rodri_qg9lw6.jpg',
    },
    {
      name: 'Natalia  Iglesias Gonzalez',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730233/naty_gktztr.jpg',
    },
    {
      name: 'Damián García Abreu',
      img: 'https://res.cloudinary.com/verdevolver/image/upload/v1677730241/dami_sa1vpt.jpg',
    },
  ];
  return (
    <Flex
      flexDirection="column"
      align="center"
      bg={colorMode === 'light' ? '#b4c4ac' : '#212933'}
      padding="1rem"
    >
      <Box
        borderRadius="lg"
        mb="0.8rem"
        p="0.7rem"
        bg={colorMode === 'light' ? '#F5F2EB' : '#2c835b'}
      >
        <Heading align="center" fontFamily="Exo 2" mb="0.8rem">
          Proyecto final Henry
        </Heading>
        <Text
          align="center"
          width="90vw"
          m="0.7rem"
          fontSize="xl"
          fontFamily="lato"
        >
          VerDeVolver es un sitio web sin fines de lucro, que busca promover e
          informar sobre el reciclaje y gestión de residuos a nivel nacional en
          Argentina, a través de una interfaz de usuario intuitiva y amigable.
          Ofrecemos una guía simple sobre los materiales reciclables (qué son,
          qué hacer con ellos, cuánto dañan el medio ambiente) y un mapa
          georreferenciado que muestra los lugares (entidades VdV) cercanos
          donde puedes entregar tus residuos. Las entidades VdV son
          organizaciones, cooperativas, emprendimientos, empresas o particulares
          que reciben, reciclan y/o reutilizan determinados residuos.
          VerDeVolver no está involucrada ni participa directamente con ninguno
          de los puntos de reciclaje en el mapa.
        </Text>
      </Box>

      <Flex flexWrap="wrap" align="center" w="100%" ml="30vh">
        {devList.map((dev) =>
          renderDevCard(dev.name, dev.img, dev.linkedin, dev.ig, dev.mail)
        )}
      </Flex>
    </Flex>
  );
};

export default About;
