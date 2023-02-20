import React from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link,
  useColorMode,
  Avatar,
} from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

const Navbar = () => {
  const { colorMode } = useColorMode();
  //Este user id deberia sacarse del local storage o de donde sea que se guarde el id del usuario
  const userId = 1;

  return (
    <Box bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}>
      <Flex justifyContent={'center'} mb={'3rem'}>
        <Link as={ReachLink} to="/home">
          <Box boxSize="10em" position={'absolute'} top="-10" left={0}>
            <Image boxSize="170px" objectFit="cover" src="/images/logo.png" />
          </Box>
        </Link>
        <Box fontWeight={'700'} fontSize="1.5em" mt={'2%'}>
          <Link
            as={ReachLink}
            to="/map"
            color={colorMode === 'light' ? 'green' : '#68D391'}
            mr={5}
          >
            Mapa
          </Link>
          <Link as={ReachLink} to="/beVdV" color="green" mr={5}></Link>
          <Link
            as={ReachLink}
            to="/login"
            color={colorMode === 'light' ? 'green' : '#68D391'}
            mr={5}
          >
            SerVdV
          </Link>
          <Link
            as={ReachLink}
            to="/entities"
            color={colorMode === 'light' ? 'green' : '#68D391'}
            mr={5}
          >
            VdVs
          </Link>
          <Menu>
            <MenuButton
              fontWeight={'700'}
              color={colorMode === 'light' ? 'green' : '#68D391'}
            >
              Contactanos
            </MenuButton>
            <MenuList>
              <MenuItem
                as={ReachLink}
                to="/about"
                fontWeight={'700'}
                color={colorMode === 'light' ? 'green' : '#68D391'}
              >
                Quienes somos
              </MenuItem>
              <MenuItem
                as={ReachLink}
                to="/contact"
                fontWeight={'700'}
                color={colorMode === 'light' ? 'green' : '#68D391'}
              >
                Contacto
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box boxSize="50px" position={'absolute'} top="2" right={2}>
          <Menu>
            <MenuButton>
              <Avatar name="User" icon={<AiOutlineUser />} />
            </MenuButton>
            <MenuList>
              <MenuItem
                as={ReachLink}
                to={`/userprofile/${userId}`}
                fontWeight={'700'}
                color={colorMode === 'light' ? 'green' : '#68D391'}
              >
                Mi perfil
              </MenuItem>
              <MenuItem
                as={ReachLink}
                to="/"
                fontWeight={'700'}
                color={colorMode === 'light' ? 'green' : '#68D391'}
              >
                Cerrar Sesión
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
