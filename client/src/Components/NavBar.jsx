import React, { useEffect } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  useColorMode,
  HStack,
  Box,
  Link,
  Image,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import Profile from './Profile';

const Navbar = () => {
  const { colorMode } = useColorMode();

  useEffect;

  return (
    <HStack
      bg={colorMode === 'light' ? '#F5F2EB' : '#2D3748'}
      justifyContent="space-between"
      alignItems="center"
      pr="1rem"
    >
      <Link as={ReachLink} to="/home">
        <Image
          src="https://res.cloudinary.com/verdevolver/image/upload/v1677472484/images/kj5khde8ek1o7xrpwhaj.png"
          w="10rem"
          style={{ transform: 'scale(1.4)' }}
        />
      </Link>

      <List display="flex" flexDir="row" gap="1rem">
        <ListItem
          as={ReachLink}
          to="/map"
          color={colorMode === 'light' ? 'green' : '#68D391'}
          fontWeight="semibold"
          fontSize="xl"
        >
          Mapa
        </ListItem>

        <ListItem color={colorMode === 'light' ? 'green' : '#68D391'}>
          <Menu>
            <MenuButton fontWeight="semibold" fontSize="xl">
              Puntos de reciclaje
            </MenuButton>
            <MenuList>
              <MenuItem
                as={ReachLink}
                to="/entities"
                color={colorMode === 'light' ? 'green' : '#68D391'}
                fontWeight="semibold"
                fontSize="xl"
              >
                Ver todos
              </MenuItem>
              <MenuItem
                as={ReachLink}
                to="/beVdV"
                color={colorMode === 'light' ? 'green' : '#68D391'}
                fontWeight="semibold"
                fontSize="xl"
              >
                Publica tu punto de reciclaje
              </MenuItem>
            </MenuList>
          </Menu>
        </ListItem>

        <ListItem>
          <Menu>
            <MenuButton
              color={colorMode === 'light' ? 'green' : '#68D391'}
              fontWeight="semibold"
              fontSize="xl"
            >
              Contactanos
            </MenuButton>
            <MenuList>
              <MenuItem
                as={ReachLink}
                to="/about"
                color={colorMode === 'light' ? 'green' : '#68D391'}
                fontWeight="semibold"
                fontSize="xl"
              >
                Quienes somos
              </MenuItem>
              <MenuItem
                as={ReachLink}
                to="/contact"
                color={colorMode === 'light' ? 'green' : '#68D391'}
                fontWeight="semibold"
                fontSize="xl"
              >
                Contacto
              </MenuItem>
            </MenuList>
          </Menu>
        </ListItem>
      </List>

      <Profile />
    </HStack>
  );
};

export default Navbar;
